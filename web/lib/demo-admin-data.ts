/**
 * Demo data for admin panel (商戶、上架商品、申請訊息).
 * Used when logged in as demo admin (admin@demo.com).
 */

export interface DemoMerchant {
  id: string
  email: string
  firstName: string
  lastName: string
  shopName: string
  avatar?: string
  status: 'active' | 'suspended'
  productCount: number
  joinedAt: string
}

export interface DemoAdminProduct {
  id: string
  merchantId: string
  merchantName: string
  name: string
  price: number
  images: string[]
  stock: number
  isActive: boolean
  category: string
}

export type ApplicationStatus = 'pending' | 'approved' | 'rejected'
export type ApplicationType = 'product_listing' | 'merchant_verify' | 'feature_request'

export interface DemoApplication {
  id: string
  type: ApplicationType
  typeLabel: string
  merchantId: string
  merchantName: string
  title: string
  content: string
  status: ApplicationStatus
  createdAt: string
  extra?: string
  rejectionReason?: string // 管理員拒絕時填寫的原因
}

export const demoMerchants: DemoMerchant[] = [
  {
    id: 'demo-merchant-1',
    email: 'merchant@demo.com',
    firstName: '商戶',
    lastName: '王',
    shopName: '毛孩百貨',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=merchant',
    status: 'active',
    productCount: 5,
    joinedAt: '2024-01-15',
  },
  {
    id: 'demo-merchant-2',
    email: 'shop2@demo.com',
    firstName: '李',
    lastName: '小姐',
    shopName: '寵物食堂',
    status: 'active',
    productCount: 3,
    joinedAt: '2024-02-20',
  },
  {
    id: 'demo-merchant-3',
    email: 'shop3@demo.com',
    firstName: '陳',
    lastName: '先生',
    shopName: '汪汪用品店',
    status: 'active',
    productCount: 8,
    joinedAt: '2024-03-01',
  },
]

export const demoAdminProducts: DemoAdminProduct[] = [
  {
    id: 'ap1',
    merchantId: 'demo-merchant-1',
    merchantName: '毛孩百貨',
    name: '優質狗糧 - 全天然配方',
    price: 299,
    images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'],
    stock: 50,
    isActive: true,
    category: '食品',
  },
  {
    id: 'ap2',
    merchantId: 'demo-merchant-1',
    merchantName: '毛孩百貨',
    name: '互動益智玩具球',
    price: 199,
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400'],
    stock: 30,
    isActive: true,
    category: '玩具',
  },
  {
    id: 'ap3',
    merchantId: 'demo-merchant-2',
    merchantName: '寵物食堂',
    name: '健康零食 - 雞肉條',
    price: 89,
    images: ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400'],
    stock: 150,
    isActive: true,
    category: '食品',
  },
  {
    id: 'ap4',
    merchantId: 'demo-merchant-3',
    merchantName: '汪汪用品店',
    name: '舒適寵物床墊',
    price: 599,
    images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400'],
    stock: 20,
    isActive: true,
    category: '寢具',
  },
]

export const demoApplications: DemoApplication[] = [
  {
    id: 'app1',
    type: 'product_listing',
    typeLabel: '商品上架申請',
    merchantId: 'demo-merchant-2',
    merchantName: '寵物食堂',
    title: '申請上架新商品',
    content: '本公司欲上架新產品「有機貓草盒」，已備齊商品圖片與說明，請審核。',
    status: 'pending',
    createdAt: '2024-03-10 14:30',
    extra: '有機貓草盒',
  },
  {
    id: 'app2',
    type: 'merchant_verify',
    typeLabel: '商戶認證申請',
    merchantId: 'demo-merchant-3',
    merchantName: '汪汪用品店',
    title: '申請成為認證商戶',
    content: '已上傳商業登記及店舖照片，希望申請認證商戶資格以取得更多曝光。',
    status: 'pending',
    createdAt: '2024-03-09 11:00',
  },
  {
    id: 'app3',
    type: 'product_listing',
    typeLabel: '商品上架申請',
    merchantId: 'demo-merchant-1',
    merchantName: '毛孩百貨',
    title: '申請上架新商品',
    content: '申請上架「寵物專用洗髮精」，類別：美容。',
    status: 'approved',
    createdAt: '2024-03-05 09:15',
    extra: '寵物專用洗髮精',
  },
  {
    id: 'app4',
    type: 'feature_request',
    typeLabel: '功能申請',
    merchantId: 'demo-merchant-2',
    merchantName: '寵物食堂',
    title: '申請開通「限時優惠」功能',
    content: '希望能在後台設定限時折扣，方便做促銷活動。',
    status: 'rejected',
    createdAt: '2024-03-01 16:45',
    rejectionReason: '該功能預計下季才開放，請稍後再申請。',
  },
]
