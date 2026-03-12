'use client'

import { useState } from 'react'
import Image from 'next/image'
import UserMenu from '../components/UserMenu'
import { useLanguage } from '@/contexts/LanguageContext'

// Demo products
const demoProducts = [
  {
    id: '1',
    name: '優質狗糧 - 全天然配方',
    price: 299,
    originalPrice: 399,
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'],
    category: 'FOOD',
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
  },
  {
    id: '2',
    name: '互動益智玩具球',
    price: 199,
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400'],
    category: 'TOY',
    rating: 4.8,
    reviewCount: 89,
    stock: 30,
  },
  {
    id: '3',
    name: '寵物專用洗髮精',
    price: 149,
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'],
    category: 'GROOMING',
    rating: 4.3,
    reviewCount: 256,
    stock: 100,
  },
  {
    id: '4',
    name: '舒適寵物床墊',
    price: 599,
    originalPrice: 799,
    images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'],
    category: 'BEDDING',
    rating: 4.7,
    reviewCount: 67,
    stock: 20,
  },
  {
    id: '5',
    name: '健康零食 - 雞肉條',
    price: 89,
    images: ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400'],
    category: 'FOOD',
    rating: 4.6,
    reviewCount: 342,
    stock: 150,
  },
  {
    id: '6',
    name: '時尚寵物項圈',
    price: 249,
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'],
    category: 'ACCESSORY',
    rating: 4.4,
    reviewCount: 178,
    stock: 45,
  },
]

const categories = [
  { id: 'all', labelKey: 'all' },
  { id: 'FOOD', labelKey: 'food' },
  { id: 'TOY', labelKey: 'toy' },
  { id: 'ACCESSORY', labelKey: 'accessory' },
  { id: 'GROOMING', labelKey: 'grooming' },
  { id: 'BEDDING', labelKey: 'bedding' },
]

export default function MarketplacePage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = demoProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-calico-white-50 via-calico-orange-50 to-calico-white-100 overflow-x-hidden pb-[calc(6rem+env(safe-area-inset-bottom,0px))]">
      {/* Header */}
      <div className="bg-calico-white-50 border-b border-calico-white-300 sticky top-0 z-10 safe-area-inset-top overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-3">
          <div className="flex items-center justify-center relative gap-3 mb-2 min-w-0">
            <div className="min-w-0 flex-1 flex flex-col items-center justify-center text-center">
              <h1 className="text-base md:text-xl font-semibold text-calico-black-700 w-full">{t('marketplace.title')}</h1>
              <p className="text-xs md:text-sm text-calico-black-500 mt-0.5 w-full">{t('marketplace.subtitle')}</p>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex-shrink-0">
              <UserMenu />
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-3 md:mb-4">
            <input
              type="text"
              placeholder={t('marketplace.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-w-0 px-4 py-2.5 md:py-2 border border-calico-white-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-calico-orange-500 text-sm md:text-base touch-target bg-calico-white-50"
            />
          </div>

          {/* Categories - 不加 emoji，文字置中 */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-full whitespace-nowrap transition-all touch-target flex items-center justify-center text-center ${
                  selectedCategory === category.id
                    ? 'bg-calico-orange-500 text-white shadow-md scale-105'
                    : 'bg-calico-white-50 text-calico-black-700 hover:bg-calico-orange-100 active:scale-95 border border-calico-white-300'
                }`}
              >
                <span className="text-sm md:text-base font-medium">{t(`marketplace.${category.labelKey}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card-paw overflow-hidden cursor-pointer active:scale-95 min-w-0"
            >
              <div className="relative h-40 md:h-48 bg-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs md:text-sm font-semibold shadow-md">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>
              
              <div className="p-3 md:p-4">
                <h3 className="font-semibold mb-2 line-clamp-2 text-sm md:text-base">{product.name}</h3>
                
                <div className="flex items-center gap-1.5 md:gap-2 mb-2">
                  <div className="flex items-center">
                    <span className="text-bird-500 text-sm md:text-base">⭐</span>
                    <span className="text-xs md:text-sm ml-1 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-lg md:text-xl font-bold text-calico-orange-600">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs md:text-sm text-gray-400 line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 hidden md:inline">
                    {t('marketplace.stock')}: {product.stock}
                  </span>
                </div>

                <button className="w-full mt-2 py-2 bg-calico-orange-500 text-white rounded-lg hover:bg-calico-orange-600 active:scale-95 transition-all touch-target text-sm md:text-base font-medium">
                 {t('marketplace.addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600">{t('marketplace.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
