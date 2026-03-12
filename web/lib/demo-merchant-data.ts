/**
 * Demo data for merchant dashboard (商家後台).
 * Used when logged in as demo merchant (merchant@demo.com) — id: demo-merchant-1，毛孩百貨.
 */

export interface DemoMerchantProduct {
  id: string
  name: string
  description?: string
  price: number
  images: string[]
  category: string
  stock: number
  isActive: boolean
  sku?: string
}

export interface DemoMerchantOrder {
  id: string
  totalAmount: number
  status: string
  createdAt: string
}

export interface DemoMerchantStats {
  totalRevenue: number
  totalOrders: number
  averageRating: number
  /** 當年 1–12 月每月銷售額，依序 [1月, 2月, ... , 12月] */
  monthlyRevenue: number[]
}

const CURRENT_YEAR = new Date().getFullYear()

export const demoMerchantProducts: DemoMerchantProduct[] = [
  {
    id: 'ap1',
    name: '優質狗糧 - 全天然配方',
    description: '全天然配方，無添加防腐劑，適合成犬。',
    price: 299,
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'],
    category: '食品',
    stock: 50,
    isActive: true,
    sku: 'FD-001',
  },
  {
    id: 'ap2',
    name: '互動益智玩具球',
    description: '耐咬材質，可塞零食，增加互動。',
    price: 199,
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400'],
    category: '玩具',
    stock: 30,
    isActive: true,
    sku: 'TY-002',
  },
  {
    id: 'mp3',
    name: '寵物專用洗髮精',
    description: '溫和配方，不刺激眼睛，留香持久。',
    price: 189,
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
    category: '美容',
    stock: 45,
    isActive: true,
    sku: 'GR-003',
  },
  {
    id: 'mp4',
    name: '小型犬保暖外套',
    description: '冬季保暖，多色可選。',
    price: 399,
    images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'],
    category: '服飾',
    stock: 18,
    isActive: false,
    sku: 'CL-004',
  },
]

export const demoMerchantOrders: DemoMerchantOrder[] = [
  { id: 'ord-demo-m1-001', totalAmount: 698, status: '已完成', createdAt: `${CURRENT_YEAR}-03-10T14:30:00` },
  { id: 'ord-demo-m1-002', totalAmount: 299, status: '已完成', createdAt: `${CURRENT_YEAR}-03-09T11:20:00` },
  { id: 'ord-demo-m1-003', totalAmount: 388, status: '已完成', createdAt: `${CURRENT_YEAR}-03-08T09:15:00` },
  { id: 'ord-demo-m1-004', totalAmount: 597, status: '處理中', createdAt: `${CURRENT_YEAR}-03-11T08:00:00` },
  { id: 'ord-demo-m1-005', totalAmount: 199, status: '待出貨', createdAt: `${CURRENT_YEAR}-03-11T10:45:00` },
]

/** 當年 1–12 月每月銷售額（用於棒形圖），demo 固定值 */
function buildMonthlyRevenue(): number[] {
  const now = new Date()
  const currentMonth = now.getMonth()
  const months = Array.from({ length: 12 }, (_, m) => {
    if (m > currentMonth) return 0
    const base = 8000 + (m + 1) * 500
    const variation = m % 3 === 0 ? 1.2 : m % 2 === 0 ? 0.9 : 1
    return Math.round(base * variation)
  })
  return months
}

export function getDemoMerchantStats(): DemoMerchantStats {
  const monthlyRevenue = buildMonthlyRevenue()
  const totalRevenue = monthlyRevenue.reduce((a, b) => a + b, 0)
  return {
    totalRevenue,
    totalOrders: demoMerchantOrders.length + 42,
    averageRating: 4.6,
    monthlyRevenue,
  }
}
