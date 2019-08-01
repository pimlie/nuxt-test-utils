import '../../utils/runner/jest'
import { pathsTest } from '.'

export function pathsCallback ({ paths, match }) {
  for (const item of paths) {
    expect(item.path).toEqual(expect.stringMatching(match))
  }
}

export function test (config = {}) {
  pathsTest(config, pathsCallback)
}
