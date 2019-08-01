import { isTestEnv } from '..'

const runnerName = 'jest'
let __nuxtTestSetup = false

export default function setupTestEnv () {
  if (__nuxtTestSetup && global.nuxtTestRunner === runnerName) {
    return
  }

  __nuxtTestSetup = true
  global.nuxtTestRunner = runnerName

  global.createSpy = (...args) => jest.fn(...args)
  global.createGroup = (name, fn) => describe(name, fn)
  global.createTest = (name, fn) => test(name, fn)
}

if (isTestEnv) {
  setupTestEnv()
}
