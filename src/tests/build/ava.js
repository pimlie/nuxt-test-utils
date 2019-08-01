import '../../utils/runner/ava'
import { fullTest } from '.'

export function buildCallback ({ builder, buildDone }, t) {
  t.is(builder._buildStatus, 2)
  t.true(buildDone.calledOnce)
}

export function test (config = {}) {
  fullTest(config, { buildCallback })
}
