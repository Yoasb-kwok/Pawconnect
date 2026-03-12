'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  type Locale,
  DEFAULT_LOCALE,
  getLocaleFromStorage,
  setLocaleInStorage,
  getTranslation,
  LOCALE_LABELS,
} from '@/lib/i18n'

import zhHK from '@/locales/zh-HK.json'
import zhHant from '@/locales/zh-Hant.json'
import en from '@/locales/en.json'

const messages: Record<Locale, Record<string, unknown>> = {
  'zh-HK': zhHK as Record<string, unknown>,
  'zh-Hant': zhHant as Record<string, unknown>,
  en: en as Record<string, unknown>,
}

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  localeLabels: typeof LOCALE_LABELS
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLocaleState(getLocaleFromStorage())
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setLocaleInStorage(newLocale)
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      if (!mounted) return key
      return getTranslation(messages[locale], key, params)
    },
    [locale, mounted]
  )

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        localeLabels: LOCALE_LABELS,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
