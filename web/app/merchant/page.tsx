'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { productApi, orderApi } from '@/lib/api'
import {
  demoMerchantProducts,
  demoMerchantOrders,
  getDemoMerchantStats,
  type DemoMerchantProduct,
  type DemoMerchantOrder,
} from '@/lib/demo-merchant-data'
import Image from 'next/image'

const MONTH_LABELS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

export default function MerchantPage() {
  const router = useRouter()
  const { user, isMerchant } = useAuth()
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'stats'>('products')
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  const isDemoMerchant = !!user?.id?.startsWith('demo-') && isMerchant

  useEffect(() => {
    if (!user || !isMerchant) {
      router.push('/login')
      return
    }
    loadData()
  }, [user, activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (isDemoMerchant) {
        if (activeTab === 'products') setProducts(demoMerchantProducts)
        else if (activeTab === 'orders') setOrders(demoMerchantOrders)
        else if (activeTab === 'stats') setStats(getDemoMerchantStats())
        setLoading(false)
        return
      }
      if (activeTab === 'products') {
        const data = await productApi.getMyProducts()
        setProducts(data)
      } else if (activeTab === 'orders') {
        const data = await orderApi.getMyOrders()
        setOrders(data)
      } else if (activeTab === 'stats') {
        const data = await orderApi.getOrderStats()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleProduct = async (id: string) => {
    if (isDemoMerchant) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
      )
      return
    }
    try {
      await productApi.toggleActive(id)
      loadData()
    } catch (error) {
      console.error('Failed to toggle product:', error)
    }
  }

  const handleSaveProduct = async (payload: {
    name: string
    description?: string
    price: number
    stock: number
    category: string
    images: string[]
  }) => {
    if (!editingProduct) return
    if (isDemoMerchant) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...payload } : p
        )
      )
      setEditingProduct(null)
      return
    }
    try {
      await productApi.update(editingProduct.id, payload)
      loadData()
      setEditingProduct(null)
    } catch (error) {
      console.error('Failed to update product:', error)
    }
  }

  if (!user || !isMerchant) return null

  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      {/* Header */}
      <div className="bg-calico-white-50 border-b border-calico-white-300 sticky top-0 z-10 safe-area-inset-top">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-calico-black-700">商家後台</h1>
            {activeTab === 'products' && (
              <button
                onClick={() => setShowAddProduct(true)}
                className="btn-paw px-4 py-2 text-sm"
              >
                + 新增商品
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-calico-white-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-calico-orange-500 text-white'
                : 'text-calico-black-600 hover:text-calico-black-700'
            }`}
          >
            我的商品
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'orders'
                ? 'bg-calico-orange-500 text-white'
                : 'text-calico-black-600 hover:text-calico-black-700'
            }`}
          >
            訂單管理
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'stats'
                ? 'bg-calico-orange-500 text-white'
                : 'text-calico-black-600 hover:text-calico-black-700'
            }`}
          >
            銷售統計
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12 text-calico-black-500">載入中...</div>
        ) : (
          <>
            {activeTab === 'products' && (
              <div className="card-paw p-6">
                <h2 className="text-lg font-bold mb-4">商品管理</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
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
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="text-3xl">📦</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-calico-black-700 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-calico-black-500 mb-2">
                        ${product.price} · 庫存: {product.stock}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleProduct(product.id)}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            product.isActive
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {product.isActive ? '下架' : '上架'}
                        </button>
                        <button
                          onClick={() => setEditingProduct({ ...product })}
                          className="px-3 py-2 bg-calico-white-200 text-calico-black-700 rounded-lg hover:bg-calico-white-300 transition-colors text-sm"
                        >
                          編輯
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="card-paw p-6">
                <h2 className="text-lg font-bold mb-4">訂單列表</h2>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 bg-calico-white-100 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-calico-black-700">
                          訂單 #{order.id.slice(0, 8)}
                        </p>
                        <span className="px-3 py-1 bg-calico-orange-100 text-calico-orange-700 rounded-full text-xs font-medium">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-calico-black-500 mb-1">
                        總額: ${order.totalAmount}
                      </p>
                      <p className="text-xs text-calico-black-400">
                        {new Date(order.createdAt).toLocaleString('zh-TW')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && stats && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card-paw p-6 text-center">
                    <div className="text-3xl mb-2">💰</div>
                    <p className="text-2xl font-bold text-calico-black-700">
                      ${stats.totalRevenue ?? 0}
                    </p>
                    <p className="text-sm text-calico-black-500 mt-1">總收入</p>
                  </div>
                  <div className="card-paw p-6 text-center">
                    <div className="text-3xl mb-2">📦</div>
                    <p className="text-2xl font-bold text-calico-black-700">
                      {stats.totalOrders ?? 0}
                    </p>
                    <p className="text-sm text-calico-black-500 mt-1">總訂單</p>
                  </div>
                  <div className="card-paw p-6 text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <p className="text-2xl font-bold text-calico-black-700">
                      {stats.averageRating ?? 0}
                    </p>
                    <p className="text-sm text-calico-black-500 mt-1">平均評分</p>
                  </div>
                </div>

                {stats.monthlyRevenue && stats.monthlyRevenue.length === 12 && (() => {
                  const maxAmount = Math.max(...stats.monthlyRevenue, 1)
                  const maxWan = Math.ceil(maxAmount / 10000) || 1
                  const scaleMax = maxWan * 10000
                  return (
                    <div className="card-paw p-6">
                      <h3 className="text-lg font-bold text-calico-black-700 mb-4">
                        {new Date().getFullYear()} 年每月銷售額（單位：萬）
                      </h3>
                      <div className="flex gap-2">
                        <div className="flex flex-col justify-between text-right pr-2 text-xs text-calico-black-500 shrink-0">
                          {Array.from({ length: maxWan + 1 }, (_, i) => maxWan - i).map((wan) => (
                            <span key={wan}>{wan}萬</span>
                          ))}
                        </div>
                        <div className="flex-1 flex items-end gap-1 sm:gap-2 h-48 min-w-0">
                          {stats.monthlyRevenue.map((value: number, i: number) => {
                            const heightPercent = scaleMax ? (value / scaleMax) * 100 : 0
                            const wanDisplay = value > 0 ? (value / 10000).toFixed(1) : '0'
                            return (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                                <div
                                  className="w-full bg-calico-orange-400 rounded-t transition-all hover:bg-calico-orange-500"
                                  style={{ height: `${heightPercent}%`, minHeight: value > 0 ? '4px' : 0 }}
                                  title={`${MONTH_LABELS[i]}: ${wanDisplay}萬`}
                                />
                                <span className="text-xs text-calico-black-500 truncate w-full text-center">
                                  {MONTH_LABELS[i]}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </>
        )}
      </div>

      {/* 編輯商品 Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  )
}

function EditProductModal({
  product,
  onClose,
  onSave,
}: {
  product: any
  onClose: () => void
  onSave: (payload: {
    name: string
    description?: string
    price: number
    stock: number
    category: string
    images: string[]
  }) => void
}) {
  const [name, setName] = useState(product.name ?? '')
  const [description, setDescription] = useState(product.description ?? '')
  const [price, setPrice] = useState(String(product.price ?? ''))
  const [stock, setStock] = useState(String(product.stock ?? ''))
  const [category, setCategory] = useState(product.category ?? '')
  const [imagesStr, setImagesStr] = useState(
    Array.isArray(product.images) ? product.images.join('\n') : ''
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const p = Number(price)
    const s = Number(stock)
    if (!name.trim() || Number.isNaN(p) || p < 0 || Number.isNaN(s) || s < 0) return
    const images = imagesStr
      .split(/[\n,]/)
      .map((u) => u.trim())
      .filter(Boolean)
    onSave({
      name: name.trim(),
      description: description.trim() || undefined,
      price: p,
      stock: s,
      category: category.trim() || '其他',
      images: images.length ? images : (product.images ?? []),
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-lg font-bold text-calico-black-700 mb-4">編輯商品</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-calico-black-600 mb-1">商品名稱</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-calico-black-600 mb-1">描述（選填）</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-calico-black-600 mb-1">價格</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-calico-black-600 mb-1">庫存</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-calico-black-600 mb-1">分類</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="例如：食品、玩具"
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-calico-black-600 mb-1">圖片網址（一行一個）</label>
              <textarea
                value={imagesStr}
                onChange={(e) => setImagesStr(e.target.value)}
                rows={2}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calico-orange-400"
              />
            </div>
            <div className="flex gap-2 pt-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-calico-white-300 text-calico-black-600 hover:bg-calico-white-100"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-calico-orange-500 text-white font-medium hover:bg-calico-orange-600"
              >
                儲存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
