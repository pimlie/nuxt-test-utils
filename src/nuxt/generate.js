import { loadConfig, Nuxt, Builder, BundleBuilder, Generator } from '.'

export default async function generate ({
  dir,
  hookNuxt = [],
  generateConfig = { init: true, build: true },
  extendConfig
}) {
  const config = await loadConfig(dir, extendConfig)

  const nuxt = new Nuxt(config)

  await Promise.all(hookNuxt.map(fn => fn(nuxt, config)))

  const builder = new Builder(nuxt, BundleBuilder)
  const generator = new Generator(nuxt, builder)
  await generator.generate(generateConfig)

  return {
    nuxt,
    builder,
    generator,
    config
  }
}
