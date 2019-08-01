import '../../utils/runner/jest'
import { fullTest } from '.'

export function buildCallback ({ builder, buildDone }) {
  expect(builder._buildStatus).toBe(2)
  expect(buildDone).toHaveBeenCalledTimes(1)
}

export function test (config = {}) {
  fullTest(config, { buildCallback })
}
