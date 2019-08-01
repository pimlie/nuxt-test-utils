import path from 'path'
import {
  filterNewOrChanged,
  list,
  noop,
  getTestName
} from '../../utils'

export async function paths (config = {}, evaluate) {
  const { nuxt, changeablePaths = [], prevPaths = [] } = config

  // Eg normally when building Nuxt we only expect paths
  // to have changed within the nuxt.options.buildDir
  const allowedPaths = [
    `${nuxt.options.rootDir}$`,
    nuxt.options.buildDir,
    ...changeablePaths.map(p => path.isAbsolute(p) ? p : path.join(nuxt.options.srcDir, p))
  ]

  const allowedPathsRE = new RegExp(`^(${allowedPaths.join('|')})`)

  const paths = []
  for (const key in prevPaths) {
    const pathsForKey = await list(nuxt.options[`${key}Dir`], item => filterNewOrChanged(item, prevPaths[key]))
    paths.push(...pathsForKey)
  }

  const testResults = {
    paths,
    match: allowedPathsRE
  }

  if (evaluate) {
    await evaluate(testResults)
  }

  if (config.callback) {
    await config.callback(testResults)
  }

  return testResults
}

export function pathsTest (config = {}, evaluate = noop, testRunner) {
  const testName = getTestName(config, 'Check changed paths')

  createTest(testName, async (...testArgs) => {
    if (testRunner) {
      const { evaluatePaths } = await import(`./${testRunner}`)
      evaluate = evaluatePaths
    }

    return paths(config, (...cbArgs) => {
      return evaluate(...cbArgs, ...testArgs)
    })
  })
}
