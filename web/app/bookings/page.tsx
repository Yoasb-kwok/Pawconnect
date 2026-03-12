'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

// Demo: 我的預約列表（暫時空或一兩筆 demo）
const demoBookings: { id: string; sitterName: string; service: string; date: string; status: string }[] = [
  { id: '1', sitterName: 'Emily Chen', service: '遛狗', date: '3月15日 14:00', status: '已確認' },
]

export default function BookingsPage() {
  const { t } = useLanguage()
  const bookings = demoBookings

  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <h1 className="text-xl font-bold text-calico-black-700 mb-4">{t('bookings.title')}</h1>
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-calico-black-500 mb-6">{t('bookings.empty')}</p>
            <Link href="/pet-sitting" className="btn-paw">
              {t('bookings.goBook')}
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => (
              <li
                key={b.id}
                className="p-4 rounded-xl bg-calico-white-50 border border-calico-white-300"
              >
                <p className="font-semibold text-calico-black-700">{b.sitterName}</p>
                <p className="text-sm text-calico-black-500">{b.service} · {b.date}</p>
                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-calico-orange-100 text-calico-orange-700">
                  {b.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
