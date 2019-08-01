import { defaultsDeep } from 'lodash'
import { Nuxt } from '@nuxt/core'
import { Builder } from '@nuxt/builder'
import { Generator } from '@nuxt/generator'
import { BundleBuilder } from '@nuxt/webpack'
export * from '@nuxt/utils'

export {
  Nuxt,
  Builder,
  BundleBuilder,
  Generator
}

export async function loadConfig (rootDir, overrideConfig) {
  let config = {}

  try {
    config = await import(`${rootDir}/nuxt.config`).then(m => m.default || m)
  } catch (e) {
    // Ignore MODULE_NOT_FOUND
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e
    }
  }

  if (typeof config === 'function') {
    config = await config()
  }

  config.rootDir = rootDir
  config.dev = false
  config.test = true

  return defaultsDeep({}, overrideConfig, config)
}
