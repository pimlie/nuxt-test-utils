import fs from 'fs'
import path from 'path'
import env from 'node-env-file'
import { createBrowser } from 'tib'
import extendPage from './page-functions'

export const browserString = process.env.BROWSER_STRING || 'puppeteer/core'

export const useBrowserstackLocal = browserString.includes('browserstack') && browserString.includes('local')

export function startBrowser ({ folder, port, pageFunctions }) {
  if (useBrowserstackLocal) {
    const envFile = path.resolve(__dirname, '..', '..', '.env-browserstack')

    if (fs.existsSync(envFile)) {
      env(envFile)
    }
  }

  return createBrowser(browserString, {
    staticServer: {
      folder,
      port
    },
    extendPage: page => extendPage(page, pageFunctions)
  })
}
