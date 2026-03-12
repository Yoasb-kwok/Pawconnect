'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi, userApi } from '@/lib/api'
import { getDemoUser, isDemoToken, DEMO_TOKEN } from '@/lib/demo-auth'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'USER' | 'PET_SITTER' | 'MERCHANT' | 'ADMIN'
  avatar?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (data: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
  isMerchant: boolean
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('access_token')

        if (storedUser && token) {
          if (isDemoToken(token)) {
            setUser(JSON.parse(storedUser))
          } else {
            try {
              await authApi.getProfile()
              setUser(JSON.parse(storedUser))
            } catch (error) {
              localStorage.removeItem('user')
              localStorage.removeItem('access_token')
              setUser(null)
            }
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    const demoUser = getDemoUser(email, password)
    if (demoUser) {
      localStorage.setItem('access_token', DEMO_TOKEN)
      localStorage.setItem('user', JSON.stringify(demoUser))
      setUser(demoUser)
      return
    }
    try {
      const response = await authApi.login(email, password)
      const { access_token, user: userData } = response

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '登录失败')
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data)
      const { access_token, user: userData } = response

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '注册失败')
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/login'
  }

  const updateUser = async (data: {
    firstName?: string
    lastName?: string
    phone?: string
    avatar?: string
  }) => {
    if (!user) return
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (isDemoToken(token)) {
      const updated = { ...user, ...data }
      setUser(updated)
      if (typeof window !== 'undefined') localStorage.setItem('user', JSON.stringify(updated))
      return
    }
    try {
      await userApi.updateProfile(data)
      const updated = { ...user, ...data }
      setUser(updated)
      if (typeof window !== 'undefined') localStorage.setItem('user', JSON.stringify(updated))
    } catch (error) {
      throw error
    }
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === 'ADMIN'
  const isMerchant = user?.role === 'MERCHANT'

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated,
        isAdmin,
        isMerchant,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // No AuthProvider (e.g. used outside provider or SSR): return fallback so app doesn't crash, show demo data
    if (typeof window !== 'undefined') {
      try {
        const demo = getDemoUser('user@demo.com', 'demo123')
        if (demo) {
          return {
            user: demo,
            loading: false,
            login: async () => {},
            register: async () => {},
            logout: () => {},
            updateUser: async () => {},
            isAuthenticated: true,
            isAdmin: false,
            isMerchant: false,
          }
        }
      } catch (_) {}
    }
    return {
      user: null,
      loading: false,
      login: async () => {},
      register: async () => {},
      logout: () => {},
      updateUser: async () => {},
      isAuthenticated: false,
      isAdmin: false,
      isMerchant: false,
    }
  }
  return context
}
