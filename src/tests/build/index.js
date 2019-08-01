import buildNuxt from '../../nuxt/build'
import { list, noop, getFixtureName } from '../../utils'
import { pathsTest } from '../paths'

const testName = 'Build'

export async function build (config, evaluate, checkPaths) {
  config.hookNuxt = config.hookNuxt || []

  const paths = checkPaths ? {} : undefined
  const buildDone = createSpy()

  config.hookNuxt.push(async (nuxt) => {
    nuxt.hook('build:done', buildDone)

    if (checkPaths) {
      paths.root = await list(nuxt.options.rootDir)
      if (nuxt.options.rootDir !== nuxt.options.srcDir) {
        paths.src = await list(nuxt.options.srcDir)
      }
    }
  })

  const { nuxt, builder } = await buildNuxt(config)

  const testResults = {
    nuxt,
    builder,
    paths,
    buildDone
  }

  if (evaluate) {
    await evaluate(testResults)
  }

  if (config.callback) {
    await config.callback(testResults)
  }

  return testResults
}

export function buildTest (config, evaluate = noop, checkPaths) {
  createTest(testName, (...testArgs) => {
    return build(config, (...cbArgs) => {
      return evaluate(...cbArgs, ...testArgs)
    }, checkPaths)
  })
}

export function fullTest (config = {}, evaluate) {
  const fixtureName = getFixtureName(config)
  config.parentName = testName

  const checkPaths = true

  createGroup(fixtureName, () => {
    buildTest(config, (testResults, ...args) => {
      const { paths, nuxt: $nuxt } = testResults

      // use a pre-existing ref to pass to pathsTest
      config.nuxt = $nuxt
      config.prevPaths = paths

      return evaluate(testResults, ...args)
    }, checkPaths)

    pathsTest(config, noop, nuxtTestRunner)
  })
}
