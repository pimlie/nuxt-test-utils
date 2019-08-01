import { loadConfig, Nuxt, Builder, BundleBuilder } from '.'

export default async function build ({
  dir,
  hookNuxt = [],
  extendConfig
}) {
  const config = await loadConfig(dir, extendConfig)

  const nuxt = new Nuxt(config)

  await Promise.all(hookNuxt.map(fn => fn(nuxt, config)))

  const builder = new Builder(nuxt, BundleBuilder)
  await builder.build()

  return {
    nuxt,
    builder,
    config
  }
}
