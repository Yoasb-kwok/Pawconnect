'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'

function LanguageSwitcher() {
  const { locale, setLocale, localeLabels } = useLanguage()
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-calico-white-200 transition-colors touch-target text-calico-black-600"
        aria-label="Language"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-40 bg-calico-white-50 rounded-lg shadow-lg border border-calico-white-300 z-50 overflow-hidden py-1">
            {(['zh-HK', 'zh-Hant', 'en'] as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => { setLocale(loc); setOpen(false) }}
                className={`w-full text-left px-3 py-2 text-sm ${locale === loc ? 'bg-calico-orange-100 text-calico-orange-700 font-medium' : 'hover:bg-calico-white-200 text-calico-black-700'}`}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function UserMenu() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const { t, locale, setLocale, localeLabels } = useLanguage()
  const [showMenu, setShowMenu] = useState(false)
  const [showLang, setShowLang] = useState(false)

  const handleLogout = () => {
    logout()
    setShowMenu(false)
  }

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    setShowLang(false)
    setShowMenu(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-1">
        <LanguageSwitcher />
        <Link
          href="/login"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-calico-white-200 transition-colors touch-target"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-calico-black-700"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-sm font-medium text-calico-black-700 hidden sm:inline">{t('common.login')}</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-calico-white-200 transition-colors touch-target"
      >
        {user?.avatar ? (
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-calico-white-300">
            <Image
              src={user.avatar}
              alt={user.firstName}
              width={32}
              height={32}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-calico-white-200 flex items-center justify-center border-2 border-calico-white-300">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-calico-black-700"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}
        <span className="text-sm font-medium text-calico-black-700 hidden sm:inline">
          {user?.firstName}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-calico-black-500 transition-transform ${showMenu ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => { setShowMenu(false); setShowLang(false) }}
          />
          <div className="absolute right-0 top-full mt-2 w-52 bg-calico-white-50 rounded-lg shadow-lg border border-calico-white-300 z-50 overflow-hidden">
            <Link
              href="/profile"
              onClick={() => setShowMenu(false)}
              className="block px-4 py-3 hover:bg-calico-white-200 transition-colors text-sm text-calico-black-700"
            >
              {t('common.myProfile')}
            </Link>
            {/* 語言切換 */}
            <div className="border-t border-calico-white-300">
              <button
                onClick={() => setShowLang(!showLang)}
                className="w-full text-left px-4 py-3 hover:bg-calico-white-200 transition-colors text-sm text-calico-black-700 flex items-center justify-between"
              >
                <span>{t('common.language')}</span>
                <span className="text-calico-black-500 text-xs">{localeLabels[locale]}</span>
              </button>
              {showLang && (
                <div className="bg-calico-white-100 border-t border-calico-white-200">
                  {(['zh-HK', 'zh-Hant', 'en'] as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleSetLocale(loc)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        locale === loc
                          ? 'bg-calico-orange-100 text-calico-orange-700 font-medium'
                          : 'text-calico-black-700 hover:bg-calico-white-200'
                      }`}
                    >
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                onClick={() => setShowMenu(false)}
                className="block px-4 py-3 hover:bg-calico-white-200 transition-colors text-sm text-calico-black-700"
              >
                {t('common.adminPanel')}
              </Link>
            )}
            {user?.role === 'MERCHANT' && (
              <Link
                href="/merchant"
                onClick={() => setShowMenu(false)}
                className="block px-4 py-3 hover:bg-calico-white-200 transition-colors text-sm text-calico-black-700"
              >
                {t('common.merchantDashboard')}
              </Link>
            )}
            <div className="border-t border-calico-white-300" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 hover:bg-calico-white-200 transition-colors text-sm text-calico-black-700"
            >
              {t('common.logout')}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
