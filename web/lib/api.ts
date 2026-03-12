import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 添加请求拦截器，自动添加 token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器，处理 token 过期
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期，清除并跳转到登录页
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  register: async (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
  }) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },
}

// User API
export const userApi = {
  updateProfile: async (data: {
    firstName?: string
    lastName?: string
    phone?: string
    avatar?: string
  }) => {
    const response = await api.patch('/users/profile', data)
    return response.data
  },
}

// Pet API
export const petApi = {
  create: async (data: {
    name: string
    species: string
    breed?: string
    age?: number
    gender: string
    size: string
    energyLevel?: number
    personality?: string[]
    description?: string
    avatar?: string
    photos?: string[]
    isNeutered?: boolean
  }) => {
    const response = await api.post('/pets', data)
    return response.data
  },

  getMyPets: async () => {
    const response = await api.get('/pets/my')
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await api.patch(`/pets/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete(`/pets/${id}`)
    return response.data
  },
}

// Product API (for merchants)
export const productApi = {
  getMyProducts: async () => {
    const response = await api.get('/marketplace/products/my')
    return response.data
  },

  create: async (data: {
    name: string
    description?: string
    price: number
    originalPrice?: number
    images: string[]
    category: string
    tags?: string[]
    stock: number
    sku: string
  }) => {
    const response = await api.post('/marketplace/products', data)
    return response.data
  },

  update: async (id: string, data: any) => {
    const response = await api.patch(`/marketplace/products/${id}`, data)
    return response.data
  },

  toggleActive: async (id: string) => {
    const response = await api.patch(`/marketplace/products/${id}/toggle`)
    return response.data
  },
}

// Order API (for merchants)
export const orderApi = {
  getMyOrders: async () => {
    const response = await api.get('/marketplace/orders/my')
    return response.data
  },

  getOrderStats: async () => {
    const response = await api.get('/marketplace/orders/stats')
    return response.data
  },
}

// Admin API
export const adminApi = {
  getUsers: async () => {
    const response = await api.get('/admin/users')
    return response.data
  },

  getProducts: async () => {
    const response = await api.get('/admin/products')
    return response.data
  },

  getOrders: async () => {
    const response = await api.get('/admin/orders')
    return response.data
  },
}
