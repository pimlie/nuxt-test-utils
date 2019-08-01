import test from 'ava'
import sinon from 'sinon'
import { isTestEnv } from '..'

const runnerName = 'ava'

let __nuxtTestSetup = false

let groupName = ''
let useSerialTest = false

export default function setupTestEnv () {
  if (__nuxtTestSetup && global.nuxtTestRunner === runnerName) {
    return
  }

  __nuxtTestSetup = true
  global.nuxtTestRunner = runnerName

  global.createSpy = (...args) => sinon.spy(...args)
  global.createGroup = (name, fn) => {
    useSerialTest = true
    groupName = name

    fn()

    useSerialTest = false
    groupName = ''
  }
  global.createTest = (name, fn) => {
    const testName = `${groupName}${groupName ? ': ' : ''}${name}`
    if (useSerialTest) {
      return test.serial(testName, t => fn(t))
    }

    test(testName, t => fn(t))
  }
}

if (isTestEnv) {
  setupTestEnv()
}
