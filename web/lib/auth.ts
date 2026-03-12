import { api } from './api'

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
}

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.access_token)
    }
    return response.data
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.access_token)
    }
    return response.data
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },
}
