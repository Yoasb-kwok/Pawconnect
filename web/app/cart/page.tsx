'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

// Demo: 用 localStorage 或 context 儲存購物車，呢度用靜態 demo
const demoCartItems = [
  { id: '1', name: '優質狗糧 - 全天然配方', price: 299, qty: 1, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200' },
  { id: '2', name: '互動益智玩具球', price: 199, qty: 2, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200' },
]

export default function CartPage() {
  const { t } = useLanguage()
  const items = demoCartItems
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <h1 className="text-xl font-bold text-calico-black-700 mb-4">{t('cart.title')}</h1>
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-calico-black-500 mb-6">{t('cart.empty')}</p>
            <Link href="/marketplace" className="btn-paw">
              {t('cart.goShop')}
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-calico-white-50 border border-calico-white-300"
                >
                  <div className="w-20 h-20 rounded-lg bg-calico-white-200 overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt="" width={80} height={80} className="w-full h-full object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-calico-black-700 line-clamp-2">{item.name}</p>
                    <p className="text-sm text-calico-orange-600 font-semibold mt-1">${item.price} × {item.qty}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between py-3 border-t border-calico-white-300">
              <span className="font-medium text-calico-black-700">{t('cart.total')}</span>
              <span className="text-lg font-bold text-calico-orange-600">${total}</span>
            </div>
            <Link
              href="/marketplace"
              className="mt-4 block w-full py-3 rounded-xl bg-calico-orange-500 text-white text-center font-medium hover:bg-calico-orange-600 transition-colors"
            >
              {t('cart.checkout')}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
