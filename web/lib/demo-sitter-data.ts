/**
 * Demo data for pet sitter / 代放服務.
 * Demo 帳號 sitter@demo.com（寵物 工作者）的服務檔案與列表用資料。
 */

export type ServiceType = 'DOG_WALKING' | 'PET_SITTING' | 'DAYCARE' | 'BOARDING' | 'GROOMING'

export interface PetSitterProfile {
  id: string
  name: string
  avatar: string
  bio: string
  experience: number
  certifications: string[]
  hourlyRate: number
  dailyRate: number
  serviceTypes: ServiceType[]
  rating: number
  reviewCount: number
  isVerified: boolean
  backgroundCheck: boolean
}

export const serviceTypeLabels: Record<ServiceType, { labelKey: string; emoji: string }> = {
  DOG_WALKING: { labelKey: 'dogWalking', emoji: '🚶' },
  PET_SITTING: { labelKey: 'petCare', emoji: '🏠' },
  DAYCARE: { labelKey: 'daycare', emoji: '🌞' },
  BOARDING: { labelKey: 'boarding', emoji: '🛏️' },
  GROOMING: { labelKey: 'grooming', emoji: '✨' },
}

/** Demo 帳號 sitter@demo.com（寵物 工作者）的代放服務檔案，與代放頁卡片格式一致 */
export const demoAccountSitter: PetSitterProfile = {
  id: 'demo-sitter-1',
  name: '寵物 工作者',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sitter',
  bio: '專職寵物保姆，提供遛狗、到府照護與日間托育。家中無寵物，環境安靜安全，可配合您的作息。',
  experience: 4,
  certifications: ['寵物急救證書', '寵物照護認證', '動物行為學基礎'],
  hourlyRate: 130,
  dailyRate: 720,
  serviceTypes: ['DOG_WALKING', 'PET_SITTING', 'DAYCARE'],
  rating: 4.8,
  reviewCount: 86,
  isVerified: true,
  backgroundCheck: true,
}

const otherDemoSitters: PetSitterProfile[] = [
  {
    id: '1',
    name: 'Emily Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    bio: '擁有5年寵物照護經驗，專注於狗狗散步和日間照護。',
    experience: 5,
    certifications: ['寵物急救證書', '動物行為學認證'],
    hourlyRate: 150,
    dailyRate: 800,
    serviceTypes: ['DOG_WALKING', 'PET_SITTING', 'DAYCARE'],
    rating: 4.9,
    reviewCount: 127,
    isVerified: true,
    backgroundCheck: true,
  },
  {
    id: '2',
    name: 'David Wong',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    bio: '專業寵物保姆，提供24小時寄宿服務，家裡有大型安全圍欄。',
    experience: 3,
    certifications: ['寵物照護認證'],
    hourlyRate: 120,
    dailyRate: 700,
    serviceTypes: ['BOARDING', 'PET_SITTING'],
    rating: 4.7,
    reviewCount: 89,
    isVerified: true,
    backgroundCheck: true,
  },
  {
    id: '3',
    name: 'Sarah Liu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: '愛貓人士，專門照顧貓咪，提供上門服務和美容服務。',
    experience: 4,
    certifications: ['貓咪行為專家', '寵物美容證書'],
    hourlyRate: 100,
    dailyRate: 600,
    serviceTypes: ['PET_SITTING', 'GROOMING'],
    rating: 4.8,
    reviewCount: 156,
    isVerified: true,
    backgroundCheck: true,
  },
]

/** 代放服務頁使用的完整 sitter 列表（含 demo 帳號） */
export function getDemoSitterList(): PetSitterProfile[] {
  return [demoAccountSitter, ...otherDemoSitters]
}

/** 依使用者 id 取得該使用者的代放服務檔案（僅 demo-sitter-1 有） */
export function getDemoSitterProfile(userId: string): PetSitterProfile | null {
  if (userId === 'demo-sitter-1') return demoAccountSitter
  return null
}
