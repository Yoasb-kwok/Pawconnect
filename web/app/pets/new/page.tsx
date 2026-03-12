'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PawShapeSelector from '../../components/PawShapeSelector'
import { PawShape } from '../../lib/paw-personality'

export default function NewPetPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    species: 'DOG',
    breed: '',
    age: '',
    gender: 'MALE',
    size: 'MEDIUM',
    energyLevel: 3,
    personality: [] as string[],
    description: '',
    isNeutered: false,
    pawShape: undefined as PawShape | undefined,
  })

  const personalityOptions = [
    '友善', '活潑', '安靜', '獨立', '親人', '調皮', '溫和', '好動', '聰明', '好奇'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 這裡可以調用 API 創建寵物
    console.log('Creating pet:', formData)
    router.push('/matching')
  }

  const togglePersonality = (trait: string) => {
    setFormData({
      ...formData,
      personality: formData.personality.includes(trait)
        ? formData.personality.filter((t) => t !== trait)
        : [...formData.personality, trait],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-calico-white-50 via-calico-orange-50 to-calico-white-100 pb-32">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🐾</div>
          <h1 className="text-3xl font-bold mb-2 text-calico-black-700">新增寵物資料</h1>
          <p className="text-sm text-calico-black-500">肉球不滿 · Too Cute to Handle</p>
        </div>

        <form onSubmit={handleSubmit} className="card-paw p-6 md:p-8 space-y-6">
          {/* 基本資訊 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              寵物名稱 *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="例如：Buddy"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                種類 *
              </label>
              <select
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="DOG">狗狗</option>
                <option value="CAT">貓咪</option>
                <option value="BIRD">鳥類</option>
                <option value="RABBIT">兔子</option>
                <option value="OTHER">其他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                品種
              </label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="例如：Golden Retriever"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                年齡
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="歲"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                性別 *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="MALE">公</option>
                <option value="FEMALE">母</option>
                <option value="NEUTERED">已結紮</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              體型 *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFormData({ ...formData, size })}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    formData.size === size
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-pink-500'
                  }`}
                >
                  {size === 'SMALL' ? '小' : size === 'MEDIUM' ? '中' : size === 'LARGE' ? '大' : '超大'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              活力等級: {formData.energyLevel} / 5
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.energyLevel}
              onChange={(e) => setFormData({ ...formData, energyLevel: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>安靜</span>
              <span>中等</span>
              <span>活潑</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              性格特質
            </label>
            <div className="flex flex-wrap gap-2">
              {personalityOptions.map((trait) => (
                <button
                  key={trait}
                  type="button"
                  onClick={() => togglePersonality(trait)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    formData.personality.includes(trait)
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="介紹一下您的寵物..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isNeutered"
              checked={formData.isNeutered}
              onChange={(e) => setFormData({ ...formData, isNeutered: e.target.checked })}
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
            />
            <label htmlFor="isNeutered" className="ml-2 text-sm text-gray-700">
              已結紮
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="btn-paw flex-1"
            >
              完成 🐾
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
