'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

// 左側抽屜內的項目：社群、配對、代放、商城
const drawerItems: { path: string; labelKey: string; logo?: string }[] = [
  { path: '/forum', labelKey: 'forum', logo: '/media.png' },
  { path: '/matching', labelKey: 'matching', logo: '/pet-match.png' },
  { path: '/pet-sitting', labelKey: 'sitting', logo: '/dog-walking.png' },
  { path: '/marketplace', labelKey: 'market', logo: '/shops.png' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  return (
    <>
      {/* 左側抽屜：三條橫線打開，內有 代放、商城 等（加埋 社群、配對 方便導航） */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setDrawerOpen(false)}
          aria-label="關閉"
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-calico-white-50 shadow-xl border-r border-calico-white-300 safe-area-inset-top safe-area-inset-bottom"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-calico-white-300 flex items-center justify-between">
            <span className="font-bold text-calico-black-700">{t('nav.menu')}</span>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-lg hover:bg-calico-white-200 text-calico-black-600"
              aria-label={t('common.back')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="p-2">
            {drawerItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive ? 'bg-calico-orange-100 text-calico-orange-700' : 'hover:bg-calico-white-200 text-calico-black-700'
                  }`}
                >
                  {item.logo ? (
                    <span className="w-10 h-10 rounded-full bg-white border border-calico-white-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image src={item.logo} alt="" width={28} height={28} className="object-contain" unoptimized />
                    </span>
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-calico-white-200 flex-shrink-0" />
                  )}
                  <span className="font-medium">{t(`nav.${item.labelKey}`)}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* 底部欄：漢堡 | 動態 | + 出 post | 訊息 | 個人 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-calico-white-50/95 backdrop-blur-lg border-t border-calico-white-300 z-50 safe-area-inset-bottom">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between py-2 px-2">
            {/* 左：三條橫線 → 打開左側抽屜 */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setDrawerOpen((prev) => !prev) }}
              className="flex flex-col items-center gap-0.5 p-2 rounded-2xl text-calico-black-600 hover:bg-calico-orange-50 hover:text-calico-orange-600 transition-colors touch-target"
              aria-label={t('nav.menu')}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-xs font-medium">{t('nav.menu')}</span>
            </button>

            {/* 動態／通知 */}
            <Link
              href="/activity"
              className={`flex flex-col items-center gap-0.5 p-2 rounded-2xl transition-colors touch-target ${
                pathname === '/activity' ? 'text-calico-orange-500 bg-calico-orange-50' : 'text-calico-black-600 hover:bg-calico-orange-50 hover:text-calico-orange-600'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="text-xs font-medium">{t('nav.activity')}</span>
            </Link>

            {/* 中間：依頁面切換 — 社群=發文、商城=購物車、配對=發現、代放=我的預約 */}
            {(() => {
              const isForum = pathname === '/forum' || pathname.startsWith('/forum/')
              const isMatching = pathname === '/matching' || pathname.startsWith('/matching')
              const isSitting = pathname === '/pet-sitting' || pathname.startsWith('/pet-sitting') || pathname === '/bookings'
              const isMarket = pathname === '/marketplace' || pathname.startsWith('/marketplace') || pathname === '/cart'

              if (isMarket) {
                return (
                  <Link
                    href="/cart"
                    className="flex flex-col items-center gap-0.5 p-2 rounded-2xl bg-calico-orange-500 text-white hover:bg-calico-orange-600 active:scale-95 transition-all touch-target"
                    aria-label={t('nav.cart')}
                  >
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </span>
                    <span className="text-xs font-medium text-white/90">{t('nav.cart')}</span>
                  </Link>
                )
              }
              if (isSitting) {
                return (
                  <Link
                    href="/bookings"
                    className="flex flex-col items-center gap-0.5 p-2 rounded-2xl bg-calico-orange-500 text-white hover:bg-calico-orange-600 active:scale-95 transition-all touch-target"
                    aria-label={t('nav.myBookings')}
                  >
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </span>
                    <span className="text-xs font-medium text-white/90">{t('nav.myBookings')}</span>
                  </Link>
                )
              }
              if (isMatching) {
                return (
                  <Link
                    href="/matching"
                    className="flex flex-col items-center gap-0.5 p-2 rounded-2xl bg-calico-orange-500 text-white hover:bg-calico-orange-600 active:scale-95 transition-all touch-target"
                    aria-label={t('nav.discover')}
                  >
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <ellipse cx="12" cy="15" rx="5" ry="4" />
                        <circle cx="8" cy="9" r="2.5" />
                        <circle cx="12" cy="6" r="2.5" />
                        <circle cx="16" cy="9" r="2.5" />
                        <circle cx="10" cy="11" r="2" />
                        <circle cx="14" cy="11" r="2" />
                      </svg>
                    </span>
                    <span className="text-xs font-medium text-white/90">{t('nav.discover')}</span>
                  </Link>
                )
              }
              // 社群或預設：發文
              return (
                <Link
                  href="/forum?new=1"
                  className="flex flex-col items-center gap-0.5 p-2 rounded-2xl bg-calico-orange-500 text-white hover:bg-calico-orange-600 active:scale-95 transition-all touch-target"
                  aria-label={t('forum.post')}
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl leading-none">+</span>
                  <span className="text-xs font-medium text-white/90">{t('forum.post')}</span>
                </Link>
              )
            })()}

            {/* 訊息 */}
            <Link
              href="/chat"
              className={`flex flex-col items-center gap-0.5 p-2 rounded-2xl transition-colors touch-target ${
                pathname === '/chat' ? 'text-calico-orange-500 bg-calico-orange-50' : 'text-calico-black-600 hover:bg-calico-orange-50 hover:text-calico-orange-600'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.08-.902-.455-1.226a3.974 3.974 0 00-.673-.268A5.965 5.965 0 013.382 15c0-1.605.823-3.043 2.125-4.096A4.382 4.382 0 0110.5 9.5c0 1.056.393 2.035 1.07 2.827.19.227.368.47.533.722-.455.09-.902.08-1.226-.455a3.974 3.974 0 00-.268-.673A5.965 5.965 0 013.382 9c0-1.605.823-3.043 2.125-4.096A4.382 4.382 0 0110.5 2.5c0 1.056.393 2.035 1.07 2.827a4.382 4.382 0 015.656 0A4.382 4.382 0 0118.5 2.5c0 1.056.393 2.035 1.07 2.827.19.227.368.47.533.722" />
              </svg>
              <span className="text-xs font-medium">{t('nav.chat')}</span>
            </Link>

            {/* 最右：個人介面 */}
            <Link
              href="/profile"
              className={`flex flex-col items-center gap-0.5 p-2 rounded-2xl transition-colors touch-target ${
                pathname === '/profile' ? 'text-calico-orange-500 bg-calico-orange-50' : 'text-calico-black-600 hover:bg-calico-orange-50 hover:text-calico-orange-600'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="text-xs font-medium">{t('common.myProfile')}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
