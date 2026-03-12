/**
 * Demo accounts for testing without backend.
 * 寵物工作者 (PET_SITTER) shares the same app experience as USER (共通); others are separate.
 */
export type DemoRole = 'USER' | 'ADMIN' | 'MERCHANT' | 'PET_SITTER'

export interface DemoUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: DemoRole
  avatar?: string
  phone?: string
}

export const DEMO_TOKEN = 'demo'

const demoAccounts: { email: string; password: string; user: DemoUser }[] = [
  {
    email: 'user@demo.com',
    password: 'demo123',
    user: {
      id: 'demo-user-1',
      email: 'user@demo.com',
      firstName: '小明',
      lastName: '陳',
      role: 'USER',
      phone: '+852 9123 4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    },
  },
  {
    email: 'admin@demo.com',
    password: 'demo123',
    user: {
      id: 'demo-admin-1',
      email: 'admin@demo.com',
      firstName: 'Admin',
      lastName: '管理員',
      role: 'ADMIN',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  },
  {
    email: 'merchant@demo.com',
    password: 'demo123',
    user: {
      id: 'demo-merchant-1',
      email: 'merchant@demo.com',
      firstName: '商戶',
      lastName: '王',
      role: 'MERCHANT',
      phone: '+852 9234 5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=merchant',
    },
  },
  {
    email: 'sitter@demo.com',
    password: 'demo123',
    user: {
      id: 'demo-sitter-1',
      email: 'sitter@demo.com',
      firstName: '寵物',
      lastName: '工作者',
      role: 'PET_SITTER',
      phone: '+852 9345 6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sitter',
    },
  },
]

export function getDemoUser(email: string, password: string): DemoUser | null {
  const normalizedEmail = email.trim().toLowerCase()
  const account = demoAccounts.find(
    (a) => a.email === normalizedEmail && a.password === password
  )
  return account ? account.user : null
}

export function isDemoToken(token: string | null): boolean {
  return token === DEMO_TOKEN
}

/** Demo pets for demo user (小明 陳). Used on profile when no API. */
export interface DemoPet {
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

const demoUserPets: DemoPet[] = [
  {
    id: 'demo-pet-1',
    name: '阿黃',
    species: 'DOG',
    breed: '黃金獵犬',
    age: 3,
    shortDescription: '友善黃金獵犬，鍾意同其他狗同小朋友玩。',
    description: '阿黃係一隻好乖嘅黃金獵犬，性格溫馴，鍾意跑同玩波。',
    photos: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    ],
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
  },
  {
    id: 'demo-pet-2',
    name: '咪咪',
    species: 'CAT',
    breed: '英國短毛貓',
    age: 2,
    shortDescription: '文靜黏人，鍾意瞓覺同食嘢。',
    description: '咪咪係英國短毛貓，平日最鍾意瞓窗台曬太陽。',
    photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800'],
    avatar: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
  },
]

export function getDemoPets(userId: string): DemoPet[] {
  if (userId === 'demo-user-1') return demoUserPets
  return []
}
