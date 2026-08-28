// Builds the site, serves it with `vite preview`, and runs a Lighthouse
// accessibility audit against it using the project-local Chrome in .chrome/.
//
// Usage: pnpm lighthouse [path]   e.g. `pnpm lighthouse /menu`
// Output: lighthouse-report.html in the project root.
import { execSync, spawn } from 'node:child_process'
import { globSync, writeFileSync } from 'node:fs'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const PORT = 4173
const urlPath = process.argv[2] ?? '/'

// Chrome is downloaded by: pnpm dlx @puppeteer/browsers install chrome@stable --path .chrome
const [chromePath] = globSync('.chrome/chrome/*/chrome-linux64/chrome')
if (!chromePath) {
  console.error('Chrome not found. Run: pnpm dlx @puppeteer/browsers install chrome@stable --path .chrome')
  process.exit(1)
}

console.log('Building…')
execSync('pnpm build', { stdio: 'inherit' })

console.log('Starting preview server…')
const preview = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
})

// Wait for the server to accept connections
const url = `http://localhost:${PORT}${urlPath}`
for (let i = 0; ; i++) {
  try {
    await fetch(url)
    break
  } catch {
    if (i > 50) {
      console.error('Preview server never came up')
      preview.kill()
      process.exit(1)
    }
    await new Promise((r) => setTimeout(r, 200))
  }
}

const chrome = await chromeLauncher.launch({
  chromePath,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
})

try {
  console.log(`Auditing ${url}…`)
  const result = await lighthouse(url, {
    port: chrome.port,
    onlyCategories: ['accessibility'],
    output: 'html',
  })

  writeFileSync('lighthouse-report.html', result.report)

  const { lhr } = result
  const score = Math.round(lhr.categories.accessibility.score * 100)
  console.log(`\nAccessibility score: ${score}/100`)

  const failed = Object.values(lhr.audits).filter(
    (a) => a.score !== null && a.score < 1 && a.scoreDisplayMode === 'binary',
  )
  if (failed.length) {
    console.log('\nFailing audits:')
    for (const a of failed) {
      console.log(`  ✗ ${a.id}: ${a.title}`)
      for (const item of a.details?.items ?? []) {
        const node = item.node ?? item
        if (node.selector) console.log(`      ${node.selector}`)
      }
    }
  } else {
    console.log('No failing audits.')
  }
  console.log('\nFull report: lighthouse-report.html')
} finally {
  chrome.kill()
  preview.kill()
}
