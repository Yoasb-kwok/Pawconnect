'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ProfileEditPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { user, updateUser, loading: authLoading } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push('/login')
      return
    }
    setFirstName(user.firstName ?? '')
    setLastName(user.lastName ?? '')
    setPhone(user.phone ?? '')
    setAvatar(user.avatar ?? '')
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await updateUser({
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        phone: phone.trim() || undefined,
        avatar: avatar.trim() || undefined,
      })
      router.push('/profile')
    } catch (err: any) {
      setError(err?.message || t('login.errorRetry'))
    } finally {
      setSaving(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      <div className="bg-calico-white-50 border-b border-calico-white-300 sticky top-0 z-10 safe-area-inset-top">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/profile"
            className="text-calico-black-600 hover:text-calico-black-700 font-medium"
          >
            {t('common.back')}
          </Link>
          <h1 className="text-xl font-bold text-calico-black-700">{t('profile.editProfile')}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="card-paw p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-calico-white-300 flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt=""
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-4xl">👤</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-calico-black-600 mb-1">
                {t('login.firstName')}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-calico-black-600 mb-1">
                {t('login.lastName')}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-calico-black-600 mb-1">
                {t('login.phoneOptional')}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+852 9123 4567"
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-calico-black-600 mb-1">
                {t('profile.avatarUrlOptional')}
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
              />
            </div>

            <p className="text-sm text-calico-black-500">電郵：{user.email}</p>

            <div className="flex gap-3 pt-2">
              <Link
                href="/profile"
                className="flex-1 px-4 py-2 border border-calico-white-300 rounded-lg text-center text-calico-black-700 hover:bg-calico-white-100 font-medium"
              >
                {t('common.cancel')}
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-2 bg-calico-orange-500 text-white rounded-lg hover:bg-calico-orange-600 font-medium disabled:opacity-50"
              >
                {saving ? t('login.processing') : t('common.send')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
