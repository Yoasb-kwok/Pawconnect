/**
 * i18n: 香港口語 (預設)、書面中文、English
 */
export type Locale = 'zh-HK' | 'zh-Hant' | 'en'

export const LOCALE_LABELS: Record<Locale, string> = {
  'zh-HK': '香港口語',
  'zh-Hant': '書面中文',
  en: 'English',
}

export const DEFAULT_LOCALE: Locale = 'zh-HK'

export function getLocaleFromStorage(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = localStorage.getItem('locale') as Locale | null
  return stored && (stored === 'zh-HK' || stored === 'zh-Hant' || stored === 'en')
    ? stored
    : DEFAULT_LOCALE
}

export function setLocaleInStorage(locale: Locale) {
  if (typeof window !== 'undefined') localStorage.setItem('locale', locale)
}

/** Key path e.g. 'nav.forum'. Params replace {count} etc. */
export function getTranslation(
  messages: Record<string, unknown>,
  key: string,
  params?: Record<string, string | number>
): string {
  const value = key.split('.').reduce((obj: unknown, k) => (obj as Record<string, unknown>)?.[k], messages)
  if (typeof value !== 'string') return key
  if (!params) return value
  return Object.entries(params).reduce((s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)), value)
}
