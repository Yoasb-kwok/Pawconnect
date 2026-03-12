'use client'

import { useState } from 'react'
import PetCard from '../components/PetCard'
import UserMenu from '../components/UserMenu'
import { useLanguage } from '@/contexts/LanguageContext'
import type { PawShape } from '../lib/paw-personality'

// Demo data
const demoPets = [
  {
    id: '1',
    name: 'Buddy',
    age: 3,
    breed: '黃金獵犬',
    species: 'DOG',
    size: 'LARGE',
    energyLevel: 4,
    personality: ['友善', '活潑', '愛玩'],
    description: 'Buddy 是一隻非常友善的黃金獵犬，喜歡和其他狗狗玩耍，也喜歡和小朋友互動。',
    shortDescription: '友善黃金獵犬，愛與狗狗和小朋友玩。',
    pawShape: 'heart' as PawShape,
    location: '中環, 香港',
    photos: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    ],
    owner: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      gender: 'male',
    },
  },
  {
    id: '2',
    name: 'Luna',
    age: 2,
    breed: '波斯貓',
    species: 'CAT',
    size: 'SMALL',
    energyLevel: 2,
    personality: ['安靜', '溫和', '獨立'],
    description: 'Luna 是一隻優雅的波斯貓，喜歡安靜的環境，偶爾會撒嬌。',
    shortDescription: '優雅波斯貓，愛安靜、偶爾撒嬌。',
    pawShape: 'onigiri' as PawShape,
    location: '銅鑼灣, 香港',
    photos: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800',
    ],
    owner: {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      gender: 'female',
    },
  },
  {
    id: '3',
    name: 'Max',
    age: 4,
    breed: '邊境牧羊犬',
    species: 'DOG',
    size: 'MEDIUM',
    energyLevel: 5,
    personality: ['聰明', '敏捷', '好動'],
    description: 'Max 是一隻非常聰明的邊境牧羊犬，需要大量的運動和智力刺激。',
    shortDescription: '聰明邊境牧羊犬，愛運動與智力遊戲。',
    pawShape: 'rocket' as PawShape,
    location: '旺角, 香港',
    photos: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
    ],
    owner: {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      gender: 'male',
    },
  },
  {
    id: '4',
    name: 'Coco',
    age: 1,
    breed: '法國鬥牛犬',
    species: 'DOG',
    size: 'SMALL',
    energyLevel: 3,
    personality: ['可愛', '調皮', '親人'],
    description: 'Coco 是一隻可愛的法國鬥牛犬，性格溫和，適合家庭飼養。',
    shortDescription: '可愛法鬥，溫和親人，適合家庭。',
    pawShape: 'rice_grain' as PawShape,
    location: '沙田, 香港',
    photos: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
    ],
    owner: {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Williams',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      gender: 'female',
    },
  },
  {
    id: '5',
    name: 'Mimi',
    age: 5,
    breed: '暹羅貓',
    species: 'CAT',
    size: 'SMALL',
    energyLevel: 3,
    personality: ['好奇', '活潑', '親人'],
    description: 'Mimi 是一隻活潑的暹羅貓，喜歡探索新環境，對人很友善。',
    shortDescription: '活潑暹羅貓，愛探索、對人友善。',
    pawShape: 'hill' as PawShape,
    location: '尖沙咀, 香港',
    photos: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    ],
    owner: {
      id: '5',
      firstName: 'David',
      lastName: 'Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      gender: 'male',
    },
  },
]

export default function MatchingPage() {
  const { t } = useLanguage()
  const [pets, setPets] = useState(demoPets)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipedPets, setSwipedPets] = useState<string[]>([])

  const currentPet = pets[currentIndex]

  const handleSwipe = (direction: 'left' | 'right' | 'down') => {
    if (!currentPet) return

    if (direction === 'down') {
      // 往下劃：只看下一個，不標記喜歡/不感興趣
      if (currentIndex < pets.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setCurrentIndex(pets.length)
      }
      return
    }

    setSwipedPets([...swipedPets, currentPet.id])

    if (direction === 'right') {
      console.log('喜歡:', currentPet.name)
    } else {
      console.log('不感興趣:', currentPet.name)
    }

    if (currentIndex < pets.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(pets.length)
    }
  }

  if (currentIndex >= pets.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-calico-white-50 to-calico-orange-50 pb-32">
        <div className="text-center px-4">
          <div className="text-7xl mb-6 animate-bounce">🐾</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-calico-black-700">{t('matching.noMore')}</h2>
          <p className="text-calico-black-600 mb-8 text-base md:text-lg">{t('matching.noMoreHint')}</p>
          <button
            onClick={() => {
              setCurrentIndex(0)
              setSwipedPets([])
            }}
            className="btn-paw touch-target"
          >
            {t('matching.restart')} 🔄
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-calico-white-50 via-calico-orange-50 to-calico-white-100 py-4 px-4 pb-32 safe-area-inset">
      <div className="max-w-md mx-auto">
        <div className="mb-4 text-center">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-calico-black-700">{t('matching.title')} 🐾</h1>
            <a
              href="/pets/new"
              className="btn-paw px-4 py-2 text-sm touch-target"
            >
              + {t('matching.addPet')}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 bg-calico-white-300 rounded-full flex-1 max-w-xs">
              <div 
                className="h-2 bg-calico-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / pets.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-calico-black-600 font-medium">
              {currentIndex + 1} / {pets.length}
            </span>
          </div>
        </div>

        {/* 卡片堆疊區域 */}
        <div className="relative h-[70vh] max-h-[600px] min-h-[500px] mb-4">
          {/* 顯示接下來2張卡片作為預覽 */}
          {pets.slice(currentIndex, currentIndex + 3).map((pet, index) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onSwipe={handleSwipe}
              style={{
                zIndex: 10 - index,
                scale: 1 - index * 0.05,
                top: index * 10,
              }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
