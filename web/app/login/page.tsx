'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LoginPage() {
  const router = useRouter()
  const { login, register } = useAuth()
  const { t } = useLanguage()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        router.push('/forum')
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone || undefined,
        })
        router.push('/pets/new')
      }
    } catch (err: any) {
      setError(err.message || t('login.errorRetry'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-calico-white-50 flex items-center justify-center px-4 pb-32">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐾</div>
          <h1 className="text-3xl font-bold text-calico-black-700 mb-2">
            {t('forum.title')}
          </h1>
          <p className="text-sm text-calico-black-500">
            Too Cute to Handle
          </p>
        </div>

        <div className="card-paw p-6 md:p-8">
          {/* Toggle */}
          <div className="flex gap-2 mb-6 bg-calico-white-200 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-calico-orange-500 text-white'
                  : 'text-calico-black-600 hover:text-calico-black-700'
              }`}
            >
              {t('login.title')}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-calico-orange-500 text-white'
                  : 'text-calico-black-600 hover:text-calico-black-700'
              }`}
            >
              {t('login.register')}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-calico-black-700 mb-1">
                      {t('login.firstName')}
                    </label>
                    <input
                      type="text"
                      required={!isLogin}
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-500 text-sm"
                      placeholder={t('login.firstName')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-calico-black-700 mb-1">
                      {t('login.lastName')}
                    </label>
                    <input
                      type="text"
                      required={!isLogin}
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-500 text-sm"
                      placeholder={t('login.lastName')}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-calico-black-700 mb-1">
                {t('login.email')}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-500 text-sm"
                placeholder="your@email.com"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-calico-black-700 mb-1">
                  {t('login.phoneOptional')}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-500 text-sm"
                  placeholder="+852 1234 5678"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-calico-black-700 mb-1">
                {t('login.password')}
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-500 text-sm"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-paw py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('login.processing') : isLogin ? t('login.title') : t('login.register')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/forum"
              className="text-sm text-calico-black-500 hover:text-calico-orange-500"
            >
              {t('login.later')} →
            </Link>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-calico-orange-50 border border-calico-orange-200 text-xs text-calico-black-600">
            <p className="font-medium mb-1">{t('login.demoHint')}</p>
            <p>{t('login.demoUser')}: user@demo.com</p>
            <p>{t('login.demoAdmin')}: admin@demo.com · {t('login.demoMerchant')}: merchant@demo.com · {t('login.demoSitter')}: sitter@demo.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
