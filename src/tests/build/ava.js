import '../../utils/runner/ava'
import { fullTest } from '.'

export function evaluateBuild ({ builder, buildDone }, t) {
  t.is(builder._buildStatus, 2)
  t.true(buildDone.calledOnce)
}

export function test (config = {}) {
  fullTest(config, evaluateBuild)
}
