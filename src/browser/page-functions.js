export default function extendPage (page, pageFunctions, { navTimeout = 10000 } = {}) {
  return {
    async navigate (path) {
      await page.runAsyncScript((path) => {
        return new Promise((resolve) => {
          // timeout after 10s
          const timeout = setTimeout(function () {
            console.error(`browser: nuxt navigation timed out after ${Math.round(navTimeout / 1000)}s`)
            window.$nuxt.$emit('triggerScroll')
          }, navTimeout)

          window.$nuxt.$once('triggerScroll', () => {
            clearTimeout(timeout)
            resolve()
          })
          window.$nuxt.$router.push(path)
        })
      }, path)
    },
    routeData () {
      return page.runScript(() => ({ ...window.$nuxt.$route }))
    },
    ...pageFunctions(page)
  }
}
