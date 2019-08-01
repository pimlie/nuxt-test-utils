import { test as testBuild } from '../../../src/tests/build/jest'
import { test as testGenerate } from '../../../src/tests/generate/jest'

testBuild({ dir: __dirname })
testGenerate({ dir: __dirname })
