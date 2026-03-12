'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { petApi } from '@/lib/api'
import { getDemoPets } from '@/lib/demo-auth'
import { getDemoSitterProfile, serviceTypeLabels } from '@/lib/demo-sitter-data'
import { demoPosts } from '@/lib/forum-demo-data'

interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  age?: number
  avatar?: string
  photos?: string[]
  description?: string
  shortDescription?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { user, logout, isAdmin, isMerchant, loading: authLoading } = useAuth()
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  const myPosts = useMemo(() => {
    if (!user) return []
    const fullName = `${user.firstName} ${user.lastName}`.trim()
    return demoPosts.filter((p) => p.author.name === fullName)
  }, [user])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push('/login')
      return
    }
    loadPets()
  }, [user, authLoading])

  const loadPets = async () => {
    if (user?.id?.startsWith('demo-')) {
      setPets(getDemoPets(user.id) as Pet[])
      setLoading(false)
      return
    }
    try {
      const data = await petApi.getMyPets()
      setPets(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load pets:', error)
      setPets([])
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  const roleKey =
    user.role === 'ADMIN'
      ? 'profile.roleAdmin'
      : user.role === 'MERCHANT'
        ? 'profile.roleMerchant'
        : user.role === 'PET_SITTER'
          ? 'profile.roleSitter'
          : 'profile.roleUser'

  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      {/* Header */}
      <div className="bg-calico-white-50 border-b border-calico-white-300 sticky top-0 z-10 safe-area-inset-top">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-calico-black-700">{t('profile.title')}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* User Info */}
        <div className="card-paw p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-calico-white-300 flex items-center justify-center overflow-hidden flex-shrink-0">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.firstName}
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-full h-full"
                  unoptimized
                />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-calico-black-700">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-calico-black-500 truncate">{user.email}</p>
              {user.phone && (
                <p className="text-sm text-calico-black-500">{user.phone}</p>
              )}
              <span className="inline-block mt-2 px-3 py-1 bg-calico-orange-100 text-calico-orange-700 rounded-full text-xs font-medium">
                {t(roleKey)}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/profile/edit"
              className="flex-1 px-4 py-2 bg-calico-white-200 text-calico-black-700 rounded-lg hover:bg-calico-white-300 transition-colors text-center text-sm font-medium"
            >
              {t('profile.editProfile')}
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-calico-white-200 text-calico-black-700 rounded-lg hover:bg-calico-white-300 transition-colors text-sm font-medium"
            >
              {t('common.logout')}
            </button>
          </div>
        </div>

        {/* 我的代放服務檔案（僅 demo 寵物工作者顯示，與代放頁卡片格式一致） */}
        {user.role === 'PET_SITTER' && getDemoSitterProfile(user.id) && (() => {
          const sitter = getDemoSitterProfile(user.id)!
          return (
            <div className="card-paw p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-calico-black-700">我的代放服務檔案</h3>
                <Link
                  href="/pet-sitting"
                  className="text-sm font-medium text-calico-orange-600 hover:text-calico-orange-700"
                >
                  {t('petSitting.title')} →
                </Link>
              </div>
              <div className="flex gap-3 md:gap-4 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-calico-white-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src={sitter.avatar}
                      alt={sitter.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-full h-full"
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
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-xl font-bold text-calico-black-700 truncate">{sitter.name}</h3>
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <span className="text-calico-orange-500 text-base">⭐</span>
                    <span className="font-semibold text-calico-black-700">{sitter.rating}</span>
                    <span className="text-sm text-calico-black-500">
                      ({sitter.reviewCount} {t('petSitting.reviews')})
                    </span>
                  </div>
                  <p className="text-calico-black-600 mb-3 text-sm leading-relaxed">{sitter.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {sitter.serviceTypes.map((type) => {
                      const label = serviceTypeLabels[type]
                      return (
                        <span
                          key={type}
                          className="px-3 py-1 bg-calico-orange-100 text-calico-orange-700 rounded-full text-xs font-medium"
                        >
                          {label.emoji} {t(`petSitting.${label.labelKey}`)}
                        </span>
                      )
                    })}
                  </div>
                  {sitter.certifications.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-calico-black-600 mb-1">{t('petSitting.certificates')}：</p>
                      <div className="flex flex-wrap gap-2">
                        {sitter.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="text-xs bg-calico-white-200 text-calico-black-700 px-2 py-1 rounded"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-sm text-calico-black-600">{t('petSitting.hourly')}</span>
                    <span className="font-bold text-calico-orange-600">${sitter.hourlyRate}</span>
                    <span className="text-sm text-calico-black-600">{t('petSitting.daily')}</span>
                    <span className="font-bold text-calico-orange-600">${sitter.dailyRate}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* My Posts (社群貼文) */}
        <div className="card-paw p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-calico-black-700">{t('profile.myPosts')}</h3>
            <Link
              href="/forum"
              className="text-sm font-medium text-calico-orange-600 hover:text-calico-orange-700"
            >
              {t('forum.title')}
            </Link>
          </div>
          {myPosts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-calico-black-500 mb-4">{t('profile.noPostsYet')}</p>
              <Link href="/forum" className="btn-paw inline-block">
                {t('profile.goToForumToPost')}
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {myPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/forum/${post.id}`}
                    className="block p-3 rounded-xl border border-calico-white-300 hover:bg-calico-orange-50 hover:border-calico-orange-200 transition-colors"
                  >
                    <p className="text-calico-black-700 line-clamp-2 text-sm leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-calico-black-500">
                      <span>{post.createdAt}</span>
                      <span>·</span>
                      <span>{post.likes} 👍</span>
                      <span>{post.comments} 💬</span>
                    </div>
                    <span className="inline-block mt-2 text-xs font-medium text-calico-orange-600">
                      {t('profile.viewPost')} →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* My Pets (狗狗/寵物簡介) */}
        <div className="card-paw p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-calico-black-700">{t('profile.myPets')}</h3>
            <Link
              href="/pets/new"
              className="px-4 py-2 bg-calico-orange-500 text-white rounded-lg hover:bg-calico-orange-600 transition-colors text-sm font-medium"
            >
              + {t('profile.addPet')}
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-8 text-calico-black-500">{t('profile.loading')}</div>
          ) : pets.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🐾</div>
              <p className="text-calico-black-500 mb-4">{t('profile.noPetsYet')}</p>
              <Link href="/pets/new" className="btn-paw inline-block">
                {t('profile.addFirstPet')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {pets.map((pet) => (
                <Link
                  key={pet.id}
                  href={`/pets/${pet.id}`}
                  className="flex gap-4 p-4 rounded-xl border border-calico-white-300 hover:bg-calico-orange-50 hover:border-calico-orange-200 transition-colors"
                >
                  <div className="w-24 h-24 rounded-xl bg-calico-white-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {pet.avatar || (pet.photos && pet.photos[0]) ? (
                      <Image
                        src={pet.avatar || pet.photos![0]}
                        alt={pet.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-3xl">🐾</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-calico-black-700 mb-0.5">{pet.name}</h4>
                    <p className="text-xs text-calico-black-500 mb-1">
                      {pet.breed || pet.species}
                      {pet.age != null && ` · ${pet.age} ${t('matching.yearsOld')}`}
                    </p>
                    {(pet.shortDescription || pet.description) && (
                      <p className="text-sm text-calico-black-600 line-clamp-2 leading-snug">
                        {pet.shortDescription || (pet.description && pet.description.slice(0, 60) + (pet.description.length > 60 ? '…' : ''))}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions (Admin / Merchant) */}
        {(isAdmin || isMerchant) && (
          <div className="card-paw p-6">
            <h3 className="text-lg font-bold text-calico-black-700 mb-4">管理功能</h3>
            <div className="space-y-2">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="block px-4 py-3 bg-calico-orange-500 text-white rounded-lg hover:bg-calico-orange-600 transition-colors text-center font-medium"
                >
                  {t('common.adminPanel')}
                </Link>
              )}
              {isMerchant && (
                <Link
                  href="/merchant"
                  className="block px-4 py-3 bg-calico-orange-500 text-white rounded-lg hover:bg-calico-orange-600 transition-colors text-center font-medium"
                >
                  {t('common.merchantDashboard')}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
