import { createI18n } from 'vue-i18n'
import id from '@/locales/id.json'
import en from '@/locales/en.json'

export type Locale = 'id' | 'en'

function detectLocale(): Locale {
  const saved = localStorage.getItem('locale')
  if (saved === 'id' || saved === 'en') return saved

  const nav = navigator.language?.toLowerCase() ?? ''
  if (nav.startsWith('id')) return 'id'
  if (nav.startsWith('en')) return 'en'
  return 'id'
}

const initialLocale = detectLocale()

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'id',
  messages: { id, en },
  // Locale files are static (no user input), so the HTML in a few
  // messages (intro paragraphs with styled spans/links) is safe for v-html.
  warnHtmlMessage: false,
})

document.documentElement.lang = initialLocale

export default i18n
