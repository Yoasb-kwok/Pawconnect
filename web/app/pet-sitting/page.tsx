'use client'

import { useState } from 'react'
import Image from 'next/image'
import UserMenu from '../components/UserMenu'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  getDemoSitterList,
  serviceTypeLabels,
  type ServiceType,
} from '@/lib/demo-sitter-data'

export default function PetSittingPage() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const demoSitters = getDemoSitterList()

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-calico-white-50 via-calico-orange-50 to-calico-white-100 overflow-x-hidden pb-[calc(6rem+env(safe-area-inset-bottom,0px))]">
      {/* Header */}
      <div className="bg-calico-white-50/95 backdrop-blur-lg shadow-sm sticky top-0 z-10 border-b border-calico-white-300 safe-area-inset-top overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-center relative gap-3 mb-3 md:mb-4 min-w-0">
            <h1 className="text-lg md:text-2xl font-bold text-calico-black-700 text-center">{t('petSitting.title')}</h1>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex-shrink-0">
              <UserMenu />
            </div>
          </div>
          
          {/* Service Type Filter - 不加 emoji，文字置中 */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 scrollbar-hide">
            <button
              onClick={() => setSelectedService(null)}
              className={`px-3 py-2 md:px-4 md:py-2 rounded-full whitespace-nowrap transition-all touch-target flex items-center justify-center text-center ${
                selectedService === null
                  ? 'bg-calico-orange-500 text-white shadow-md scale-105'
                  : 'bg-calico-white-50 text-calico-black-700 hover:bg-calico-orange-100 active:scale-95 border border-calico-white-300'
              }`}
            >
              <span className="text-sm md:text-base font-medium">{t('petSitting.allServices')}</span>
            </button>
            {Object.entries(serviceTypeLabels).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedService(key as ServiceType)}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-full whitespace-nowrap transition-all touch-target flex items-center justify-center text-center ${
                  selectedService === key
                    ? 'bg-calico-orange-500 text-white shadow-md scale-105'
                    : 'bg-calico-white-50 text-calico-black-700 hover:bg-calico-orange-100 active:scale-95 border border-calico-white-300'
                }`}
              >
                <span className="text-sm md:text-base font-medium">{t(`petSitting.${value.labelKey}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sitters List */}
      <div className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-6">
        <div className="space-y-4">
          {demoSitters
            .filter(
              (sitter) =>
                !selectedService ||
                sitter.serviceTypes.includes(selectedService)
            )
            .map((sitter) => (
              <div
                key={sitter.id}
                className="card-paw p-4 md:p-6 overflow-hidden"
              >
                <div className="flex gap-3 md:gap-4 min-w-0">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <Image
                        src={sitter.avatar}
                        alt={sitter.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                        unoptimized
                      />
                    </div>
                    {sitter.isVerified && (
                      <div className="mt-2 text-center">
                        <span className="text-xs bg-calico-orange-500 text-white px-2 py-1 rounded-full font-medium">
                          ✓ {t('petSitting.verified')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <h3 className="text-base md:text-xl font-bold text-calico-black-700 truncate">{sitter.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            <span className="text-calico-orange-500 text-base md:text-lg">⭐</span>
                            <span className="ml-1 font-semibold text-calico-black-700">
                              {sitter.rating}
                            </span>
                          </div>
                          <span className="text-xs md:text-sm text-calico-black-500">
                            ({sitter.reviewCount} {t('petSitting.reviews')})
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-calico-black-600 mb-3 text-sm md:text-base leading-relaxed">{sitter.bio}</p>

                    {/* Service Types */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {sitter.serviceTypes.map((type) => {
                        const label = serviceTypeLabels[type]
                        return (
                          <span
                            key={type}
                            className="px-3 py-1 bg-calico-orange-100 text-calico-orange-700 rounded-full text-xs md:text-sm font-medium"
                          >
                            {label.emoji} {t(`petSitting.${label.labelKey}`)}
                          </span>
                        )
                      })}
                    </div>

                    {/* Certifications */}
                    {sitter.certifications.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">{t('petSitting.certificates')}：</p>
                        <div className="flex flex-wrap gap-2">
                          {sitter.certifications.map((cert, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing - 手機上改為垂直排列避免擠在一起 */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-xs md:text-sm text-calico-black-600">{t('petSitting.hourly')}</span>
                        <span className="text-base md:text-lg font-bold text-calico-orange-600">
                          ${sitter.hourlyRate}
                        </span>
                        <span className="text-xs md:text-sm text-calico-black-600">{t('petSitting.daily')}</span>
                        <span className="text-base md:text-lg font-bold text-calico-orange-600">
                          ${sitter.dailyRate}
                        </span>
                      </div>
                      <button className="btn-paw px-4 md:px-6 py-2 text-sm md:text-base touch-target flex-shrink-0 w-full sm:w-auto">
                        {t('petSitting.book')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
