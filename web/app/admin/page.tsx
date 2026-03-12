'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { adminApi } from '@/lib/api'
import {
  demoMerchants,
  demoAdminProducts,
  demoApplications,
  type DemoMerchant,
  type DemoAdminProduct,
  type DemoApplication,
} from '@/lib/demo-admin-data'

type Tab = 'merchants' | 'products' | 'applications' | 'orders'

export default function AdminPage() {
  const router = useRouter()
  const { user, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('merchants')
  const [merchants, setMerchants] = useState<(DemoMerchant & { role?: string })[]>([])
  const [products, setProducts] = useState<(DemoAdminProduct & { isActive?: boolean })[]>([])
  const [applications, setApplications] = useState<DemoApplication[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const isDemoAdmin = user?.id?.startsWith('demo-') && isAdmin

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push('/login')
      return
    }
    loadData()
  }, [user, activeTab])

  const loadData = async () => {
    setLoading(true)
    if (isDemoAdmin) {
      if (activeTab === 'merchants') setMerchants(demoMerchants)
      else if (activeTab === 'products') setProducts(demoAdminProducts)
      else if (activeTab === 'applications') setApplications(demoApplications)
      else setOrders([])
      setLoading(false)
      return
    }
    try {
      if (activeTab === 'merchants') {
        const data = await adminApi.getUsers()
        setMerchants((data || []).filter((u: any) => u.role === 'MERCHANT').map((u: any) => ({
          id: u.id,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          shopName: u.shopName || u.email,
          avatar: u.avatar,
          status: 'active',
          productCount: 0,
          joinedAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString('zh-TW') : '',
        })))
      } else if (activeTab === 'products') {
        const data = await adminApi.getProducts()
        setProducts(data || [])
      } else if (activeTab === 'applications') {
        setApplications([])
      } else {
        const data = await adminApi.getOrders()
        setOrders(data)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplicationAction = (id: string, status: 'approved' | 'rejected', rejectionReason?: string) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status, ...(status === 'rejected' && rejectionReason != null ? { rejectionReason } : {}) } : a
      )
    )
    setRejectingId(null)
    setRejectReason('')
  }

  const openRejectModal = (id: string) => {
    setRejectingId(id)
    setRejectReason('')
  }

  if (!user || !isAdmin) return null

  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      <div className="bg-calico-white-50 border-b border-calico-white-300 sticky top-0 z-10 safe-area-inset-top">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-calico-black-700">管理員面板</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 bg-calico-white-200 rounded-lg p-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('merchants')}
            className={`flex-shrink-0 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'merchants'
                ? 'bg-calico-orange-500 text-white'
                : 'text-calico-black-600 hover:bg-calico-black-700'
            }`}
          >
            商戶
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-shrink-0 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-calico-orange-500 text-white'
                : 'text-calico-black-600 hover:bg-calico-black-700'
            }`}
          >
            上架商品
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-shrink-0 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'applications'
                ? 'bg-calico-orange-500 text-white'
                : 'text-calico-black-600 hover:bg-calico-black-700'
            }`}
          >
            申請訊息
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-shrink-0 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'orders'
                ? 'bg-calico-orange-500 text-white'
                : 'text-calico-black-600 hover:bg-calico-black-700'
            }`}
          >
            訂單
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-calico-black-500">載入中...</div>
        ) : (
          <>
            {activeTab === 'merchants' && (
              <div className="card-paw p-6">
                <h2 className="text-lg font-bold mb-4">現有商戶</h2>
                <div className="space-y-3">
                  {merchants.length === 0 ? (
                    <p className="text-calico-black-500 py-4">暫無商戶資料</p>
                  ) : (
                    merchants.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center gap-4 p-4 bg-calico-white-100 rounded-lg"
                      >
                        <div className="w-12 h-12 rounded-full bg-calico-white-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {m.avatar ? (
                            <Image
                              src={m.avatar}
                              alt={m.shopName}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                              unoptimized
                            />
                          ) : (
                            <span className="text-xl">🏪</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-calico-black-700">{m.shopName}</p>
                          <p className="text-sm text-calico-black-500">
                            {m.firstName} {m.lastName} · {m.email}
                          </p>
                          <p className="text-xs text-calico-black-400 mt-0.5">
                            上架商品 {m.productCount} 件 · 加入於 {m.joinedAt}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            m.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {m.status === 'active' ? '營運中' : '已暫停'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="card-paw p-6">
                <h2 className="text-lg font-bold mb-4">正在上架的商品</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.length === 0 ? (
                    <p className="text-calico-black-500 col-span-full py-4">暫無商品</p>
                  ) : (
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 bg-calico-white-100 rounded-lg"
                      >
                        <div className="w-full h-32 bg-calico-white-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover rounded-lg"
                              unoptimized
                            />
                          ) : (
                            <span className="text-3xl">📦</span>
                          )}
                        </div>
                        <p className="text-xs text-calico-black-500 mb-1">{product.merchantName ?? '—'}</p>
                        <h3 className="font-semibold text-calico-black-700 mb-1">{product.name}</h3>
                        <p className="text-sm text-calico-black-500 mb-2">${product.price} · {product.category ?? '—'}</p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              (product.isActive ?? true) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {(product.isActive ?? true) ? '上架中' : '已下架'}
                          </span>
                          <span className="text-xs text-calico-black-500">庫存: {product.stock}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="card-paw p-6">
                <h2 className="text-lg font-bold mb-4">商戶申請 / 訊息</h2>
                <p className="text-sm text-calico-black-500 mb-4">
                  處理商戶上架申請、認證申請及其他功能申請
                </p>
                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <p className="text-calico-black-500 py-4">暫無申請</p>
                  ) : (
                    applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl border border-calico-white-300 bg-calico-white-50"
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded bg-calico-orange-100 text-calico-orange-700 text-xs font-medium">
                            {app.typeLabel}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              app.status === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : app.status === 'approved'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {app.status === 'pending' ? '待處理' : app.status === 'approved' ? '已通過' : '已拒絕'}
                          </span>
                        </div>
                        <p className="font-semibold text-calico-black-700">{app.title}</p>
                        <p className="text-sm text-calico-black-600 mt-1">{app.content}</p>
                        <p className="text-xs text-calico-black-400 mt-2">
                          {app.merchantName} · {app.createdAt}
                          {app.extra && ` · ${app.extra}`}
                        </p>
                        {app.status === 'rejected' && app.rejectionReason && (
                          <p className="text-sm text-red-600 mt-2">
                            拒絕原因：{app.rejectionReason}
                          </p>
                        )}
                        {app.status === 'pending' && (
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleApplicationAction(app.id, 'approved')}
                              className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
                            >
                              通過
                            </button>
                            <button
                              onClick={() => openRejectModal(app.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200"
                            >
                              拒絕
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="card-paw p-6">
                <h2 className="text-lg font-bold mb-4">訂單列表</h2>
                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <p className="text-calico-black-500 py-4">暫無訂單（Demo 無訂單資料）</p>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="p-4 bg-calico-white-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-calico-black-700">訂單 #{order.id?.slice(0, 8)}</p>
                          <span className="px-3 py-1 bg-calico-orange-100 text-calico-orange-700 rounded-full text-xs font-medium">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-calico-black-500">總額: ${order.totalAmount}</p>
                        <p className="text-xs text-calico-black-400">
                          {order.createdAt && new Date(order.createdAt).toLocaleString('zh-TW')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 拒絕原因 Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => { setRejectingId(null); setRejectReason('') }}>
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-calico-black-700 mb-2">填寫拒絕原因</h3>
            <p className="text-sm text-calico-black-500 mb-3">請填寫拒絕原因，申請者將可看到此說明。</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="輸入拒絕原因（必填）"
              className="w-full min-h-[100px] px-3 py-2 border border-calico-white-300 rounded-lg text-calico-black-700 placeholder:text-calico-black-400 focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
              autoFocus
            />
            <div className="flex gap-2 mt-4 justify-end">
              <button
                onClick={() => { setRejectingId(null); setRejectReason('') }}
                className="px-4 py-2 rounded-lg border border-calico-white-300 text-calico-black-600 hover:bg-calico-white-100"
              >
                取消
              </button>
              <button
                onClick={() => {
                  const reason = rejectReason.trim()
                  if (!reason) return
                  handleApplicationAction(rejectingId, 'rejected', reason)
                }}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                確認拒絕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
