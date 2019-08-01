import path from 'path'
import stdenv from 'std-env'

export * from './paths'

export const isTestEnv = stdenv.test

export const noop = _ => _

export function getFixtureName ({ name, dir }) {
  return name || path.basename(dir)
}

export function getTestName (config, testName) {
  const { parentName = '' } = config

  if (!testName) {
    testName = getFixtureName(config)
  }

  return `${parentName}${parentName ? ': ' : ''}${testName}`
}
