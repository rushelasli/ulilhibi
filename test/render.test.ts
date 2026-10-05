// SSR render test — exercises the real App, router, and i18n instance.
// Run from the repo root (outDir must stay INSIDE the repo so node can
// resolve `vue` etc. — /tmp would fail with ERR_MODULE_NOT_FOUND):
//   bunx vite build --ssr test/render.test.ts --outDir node_modules/.tmp/ssr
//   node node_modules/.tmp/ssr/render.test.js
await import('./stubs')

const { createSSRApp } = await import('vue')
const { renderToString } = await import('@vue/server-renderer')
const { default: i18n } = await import('@/i18n')
const { default: router } = await import('@/router')
const { default: App } = await import('@/App.vue')
const { projectLinks } = await import('@/data/projects')

type Combo = { locale: 'id' | 'en'; path: string }

const combos: Combo[] = [
  { locale: 'id', path: '/' },
  { locale: 'en', path: '/' },
]

// Unresolved vue-i18n keys leak into the HTML as e.g. ">hero.title"
const KEY_LEAK = />(nav|hero|about|projects|skills|experience|contact|footer|microamp|furuhibi|amp|meta|common)\.[a-zA-Z]/
// ... or into attribute values as e.g. alt="microamp.mascotAlt"
const ATTR_KEY_LEAK = /"(microamp|furuhibi)\.[a-zA-Z]/

const expected: Record<string, string[]> = {
  'id:/': ['Karya pilihan', 'Mendengarkan musik', 'Beranda', 'Dibuat dengan Vue', 'Apa yang saya kerjakan'],
  'en:/': ['Selected work', 'Listening to music', 'Home', 'Built with Vue', 'What I do'],
}

const outputs: Record<string, string> = {}
const failures: string[] = []

for (const { locale, path } of combos) {
  const key = `${locale}:${path}`
  try {
    i18n.global.locale.value = locale
    await router.push(path)
    await router.isReady()

    const app = createSSRApp(App)
    app.use(router)
    app.use(i18n)

    const html = await renderToString(app)
    outputs[key] = html

    if (html.length < 500) failures.push(`${key}: suspiciously short render (${html.length} chars)`)
    if (KEY_LEAK.test(html)) {
      const m = html.match(KEY_LEAK)
      failures.push(`${key}: unresolved i18n key leaked -> ${m?.[0]}`)
    }
    if (ATTR_KEY_LEAK.test(html)) {
      const m = html.match(ATTR_KEY_LEAK)
      failures.push(`${key}: unresolved key leaked in attribute -> ${m?.[0]}`)
    }
    for (const s of expected[key]) {
      if (!html.includes(s)) failures.push(`${key}: missing expected text ${JSON.stringify(s)}`)
    }
  } catch (e) {
    failures.push(`${key}: THREW ${(e as Error).stack ?? e}`)
  }
}

// The two locales must produce genuinely different HTML on the same route
const idHtml = outputs['id:/']
const enHtml = outputs['en:/']
if (idHtml && enHtml && idHtml === enHtml) failures.push('/: id and en rendered IDENTICAL html')

const homeEn = outputs['en:/'] ?? ''

// Every link in the project registry must render on the home card
for (const [slug, links] of Object.entries(projectLinks)) {
  for (const link of links) {
    if (!homeEn.includes(link.href)) failures.push(`home: "${slug}" link missing: ${link.href}`)
  }
}

// Cards route to the hub — the legacy /projects/* pages are gone entirely
// (the "See more projects" CTA at the end of the section targets the hub)
const homeId = outputs['id:/'] ?? ''
for (const [key, html] of [['en:/', homeEn], ['id:/', homeId]] as const) {
  if (html.includes('href="/projects/')) failures.push(`${key}: home still links legacy /projects/ pages`)
  if (!html.includes('project.nyaahibi.web.id/nyaahibiamp')) failures.push(`${key}: hub gen1 link missing`)
  if (!html.includes('project.nyaahibi.web.id/microhibiamp')) failures.push(`${key}: hub microhibi link missing`)
}
if (!homeEn.includes('See more projects')) failures.push('home (en): seeMore CTA missing')
if (!homeId.includes('Lihat proyek lainnya')) failures.push('home (id): seeMore CTA missing')

// Retired hosts must never reappear (nyaaop card link, microamp externals,
// furuhibi's retired subdomain — all links now target the hub)
for (const dead of ['nyaaop.nyaahibi.web.id', 'https://microamp.nyaahibi.web.id', 'https://furuhibi.nyaahibi.web.id']) {
  if (homeEn.includes(dead)) failures.push(`home: retired host present: ${dead}`)
}

// language switcher is a single flag toggle showing the current locale's flag
if (!homeId.includes('/flags/id.svg')) failures.push('home (id): language flag toggle missing')
if (!homeEn.includes('/flags/gb.svg')) failures.push('home (en): language flag toggle missing')
if (homeEn.includes('Switch language to')) failures.push('home: old ID/EN two-button switcher still present')
if (!homeEn.includes('Switch language')) failures.push('home: nav.languageToggle key not resolving')

// Brand: logo.png in the navbar (favicon/OG live in index.html, checked in preview)
if (!homeEn.includes('/logo.png')) failures.push('home: navbar brand logo missing')
if (!homeId.includes('/logo.png')) failures.push('home (id): navbar brand logo missing')

// Get in Touch icons: black in light mode, inverted only under .dark
if (!homeEn.includes('dark:brightness-0')) failures.push('home: contact icons missing dark-mode inversion classes')

console.log('rendered combos:', Object.keys(outputs).length)
for (const k of Object.keys(outputs)) console.log(`  ${k}: ${outputs[k].length} chars`)
console.log(failures.length ? '\nFAILURES:\n' + failures.join('\n') : '\nALL SSR RENDER CHECKS PASSED')
process.exit(failures.length ? 1 : 0)
