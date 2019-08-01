import '../../utils/runner/jest'
import { fullTest } from '.'

export function generateCallback ({ builder, buildDone, generateDone }) {
  expect(builder._buildStatus).toBe(2)
  expect(buildDone).toHaveBeenCalledTimes(1)
  expect(generateDone).toHaveBeenCalledTimes(1)
}

export function test (config = {}) {
  fullTest(config, { generateCallback })
}
