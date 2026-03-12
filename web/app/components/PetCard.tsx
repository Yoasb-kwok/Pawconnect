'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { pawPersonalities, type PawShape } from '../lib/paw-personality'

interface PetCardProps {
  pet: {
    id: string
    name: string
    age?: number
    breed?: string
    species: string
    size: string
    energyLevel: number
    personality: string[]
    description?: string
    shortDescription?: string
    pawShape?: PawShape
    location?: string
    avatar?: string
    photos: string[]
    owner: {
      id: string
      firstName: string
      lastName: string
      avatar?: string
      gender?: 'male' | 'female'
    }
  }
  onSwipe?: (direction: 'left' | 'right' | 'down') => void
  style?: React.CSSProperties
}

export default function PetCard({ pet, onSwipe, style }: PetCardProps) {
  const { t } = useLanguage()
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    setDragOffset({
      x: currentX - dragStart.x,
      y: currentY - dragStart.y,
    })
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100
    const downThreshold = 80
    if (dragOffset.y > downThreshold && dragOffset.y >= Math.abs(dragOffset.x)) {
      onSwipe?.('down')
    } else if (Math.abs(dragOffset.x) > threshold) {
      onSwipe?.(dragOffset.x > 0 ? 'right' : 'left')
    }
    setDragOffset({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setDragOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100
    const downThreshold = 80
    if (dragOffset.y > downThreshold && dragOffset.y >= Math.abs(dragOffset.x)) {
      onSwipe?.('down')
    } else if (Math.abs(dragOffset.x) > threshold) {
      onSwipe?.(dragOffset.x > 0 ? 'right' : 'left')
    }
    setDragOffset({ x: 0, y: 0 })
  }

  const photos = pet.photos.length > 0 ? pet.photos : [
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${pet.name}`,
  ]

  const rotation = Math.abs(dragOffset.y) < 30 ? dragOffset.x * 0.1 : 0
  const opacity = dragOffset.y > 0
    ? 1 - dragOffset.y / 350
    : 1 - Math.abs(dragOffset.x) / 300

  return (
    <div
      className="absolute w-full h-full"
      style={{
        transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
        opacity: Math.max(0.5, opacity),
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        ...style,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="bg-calico-white-50 rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col border border-calico-white-300">
        {/* 照片區域 */}
        <div className="relative flex-1 min-h-0 bg-gradient-to-br from-calico-orange-100 to-calico-paw-100">
          <Image
            src={photos[currentPhotoIndex]}
            alt={pet.name}
            fill
            className="object-cover"
            unoptimized
          />

          {/* 照片指示器 */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentPhotoIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* 滑動提示：右＝喜歡，左＝不感興趣，下＝下一個 */}
          {dragOffset.y > 50 && dragOffset.y >= Math.abs(dragOffset.x) && (
            <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-4 px-3 py-2 rounded-xl bg-black/60 text-white text-sm font-medium whitespace-nowrap">
              {t('matching.nextPet')} ↓
            </div>
          )}
          {Math.abs(dragOffset.x) > 50 && Math.abs(dragOffset.x) >= dragOffset.y && (
            <div
              className={`absolute top-6 ${
                dragOffset.x > 0 ? 'right-4' : 'left-4'
              } px-3 py-2 rounded-xl bg-black/60 text-white text-sm font-medium whitespace-nowrap`}
            >
              {dragOffset.x > 0 ? t('matching.like') : t('matching.notInterested')}
            </div>
          )}

          {/* 名字 + 年齡 標籤 */}
          <div className="absolute top-3 left-3 bg-calico-white-50/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-calico-white-300">
            <span className="font-semibold text-base text-calico-black-700">{pet.name}</span>
            {pet.age != null && <span className="text-calico-black-500 ml-1.5 text-sm">{pet.age} {t('matching.yearsOld')}</span>}
          </div>
        </div>

        {/* 資訊區：品種、爪子形狀、性格簡介 — 固定高度不滾動 */}
        <div className="flex-shrink-0 p-3 border-t border-calico-white-300 space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-calico-black-500 flex-shrink-0">{t('matching.breed')}</span>
            <span className="font-medium text-calico-black-700 truncate">{pet.breed || pet.species}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-calico-black-500 flex-shrink-0">{t('matching.age')}</span>
            <span className="font-medium text-calico-black-700">{pet.age != null ? `${pet.age} ${t('matching.yearsOld')}` : '—'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-calico-black-500 flex-shrink-0">{t('matching.pawShape')}</span>
            {pet.pawShape && pawPersonalities[pet.pawShape] ? (
              <span className="font-medium text-calico-black-700 flex items-center gap-1">
                <span>{pawPersonalities[pet.pawShape].emoji}</span>
                <span>{pawPersonalities[pet.pawShape].name}</span>
              </span>
            ) : (
              <span className="text-calico-black-400">—</span>
            )}
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-calico-black-500 flex-shrink-0">{t('matching.personality')}</span>
            <p className="font-medium text-calico-black-700 line-clamp-2 leading-snug">
              {pet.personality?.length
                ? pet.personality.join('、')
                : pet.description
                  ? pet.description.slice(0, 40) + (pet.description.length > 40 ? '…' : '')
                  : '—'}
            </p>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-calico-black-500 flex-shrink-0">{t('matching.intro')}</span>
            <p className="font-medium text-calico-black-700 line-clamp-2 leading-snug">
              {pet.shortDescription || pet.description || '—'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm pt-1 border-t border-calico-white-200 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-calico-black-500 flex-shrink-0">{t('matching.ownerLocation')}</span>
              <span className="font-medium text-calico-black-700 truncate">{pet.location || '—'}</span>
            </div>
            <span className="text-calico-black-300">·</span>
            <div className="flex items-center gap-2">
              <span className="text-calico-black-500 flex-shrink-0">{t('matching.owner')}</span>
              <span className="font-medium text-calico-black-700">
                {pet.owner.gender === 'female' ? t('common.female') : pet.owner.gender === 'male' ? t('common.male') : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
