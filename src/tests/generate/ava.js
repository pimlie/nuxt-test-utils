import '../../utils/runner/ava'
import { fullTest } from '.'

export function evaluateGenerate ({ builder, buildDone, generateDone }, t) {
  t.is(builder._buildStatus, 2)
  t.true(buildDone.calledOnce)
  t.true(generateDone.calledOnce)
}

export function test (config = {}) {
  fullTest(config, evaluateGenerate)
}
