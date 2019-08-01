import '../../utils/runner/ava'
import { pathsTest } from '.'

export function pathsCallback ({ paths, match }, t) {
  for (const item of paths) {
    t.regex(item.path, match)
  }
}

export function test (config = {}) {
  pathsTest(config, pathsCallback)
}
