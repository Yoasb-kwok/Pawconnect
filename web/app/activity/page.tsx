'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

// Placeholder activity items (通知、好友新增等)
const demoActivities = [
  { id: '1', type: 'like', textKey: 'activity.likedPost', time: '5 分鐘前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amy' },
  { id: '2', type: 'friend', textKey: 'activity.newFriend', time: '1 小時前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben' },
  { id: '3', type: 'comment', textKey: 'activity.commented', time: '2 小時前', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris' },
]

export default function ActivityPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <h1 className="text-xl font-bold text-calico-black-700 mb-4">{t('nav.activity')}</h1>
        <p className="text-sm text-calico-black-500 mb-6">
          {t('activity.subtitle')}
        </p>
        <ul className="space-y-3">
          {demoActivities.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-calico-white-50 border border-calico-white-300"
            >
              <div className="w-12 h-12 rounded-full bg-calico-white-200 overflow-hidden flex-shrink-0">
                <Image src={item.avatar} alt="" width={48} height={48} className="w-full h-full object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-calico-black-700">{t(item.textKey)}</p>
                <p className="text-xs text-calico-black-500">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
