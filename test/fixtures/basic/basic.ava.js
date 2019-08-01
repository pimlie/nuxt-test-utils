import { test as testBuild } from '../../../src/tests/build/ava'
import { test as testGenerate } from '../../../src/tests/generate/ava'

testBuild({ dir: __dirname })
testGenerate({ dir: __dirname })
