import generateNuxt from '../../nuxt/generate'
import { getFixtureName, list, noop } from '../../utils'
import { pathsTest } from '../paths'

const testName = 'Generate'

export async function generate (config, evaluate, checkPaths) {
  config.hookNuxt = config.hookNuxt || []

  const paths = checkPaths ? {} : undefined
  const buildDone = createSpy()
  const generateDone = createSpy()

  config.hookNuxt.push(async (nuxt) => {
    nuxt.hook('build:done', buildDone)
    nuxt.hook('generate:done', generateDone)

    if (checkPaths) {
      paths.root = await list(nuxt.options.rootDir)
      if (nuxt.options.rootDir !== nuxt.options.srcDir) {
        paths.src = await list(nuxt.options.srcDir)
      }
    }
  })

  const { nuxt, builder, generator } = await generateNuxt(config)

  const testResults = {
    nuxt,
    builder,
    generator,
    paths,
    buildDone,
    generateDone
  }

  if (evaluate) {
    evaluate(testResults)
  }

  if (config.callback) {
    await config.callback(testResults)
  }

  return testResults
}

export function generateTest (config, evaluate = noop, checkPaths) {
  createTest(testName, (...testArgs) => {
    return generate(config, (...cbArgs) => {
      return evaluate(...cbArgs, ...testArgs)
    }, checkPaths)
  })
}

export function fullTest (config = {}, evaluate) {
  const fixtureName = getFixtureName(config)
  config.parentName = testName

  const checkPaths = true

  createGroup(fixtureName, () => {
    generateTest(config, (testResults, ...args) => {
      const { paths, nuxt: $nuxt } = testResults

      // use a pre-existing ref to pass to pathsTest
      config.nuxt = $nuxt
      config.prevPaths = paths

      config.changeablePaths = [
        $nuxt.options.generate.dir,
        ...(config.changeablePaths || [])
      ]

      return evaluate(testResults, ...args)
    }, checkPaths)

    pathsTest(config, noop, nuxtTestRunner)
  })
}
