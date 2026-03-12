'use client'

import { useState } from 'react'
import { PawShape, pawPersonalities, analyzePawPersonality } from '../lib/paw-personality'

interface PawShapeSelectorProps {
  selectedShape?: PawShape
  onSelect: (shape: PawShape) => void
}

export default function PawShapeSelector({ selectedShape, onSelect }: PawShapeSelectorProps) {
  const [hoveredShape, setHoveredShape] = useState<PawShape | null>(null)

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-calico-black-700 mb-2">
          選擇你的毛孩肉球形狀 🐾
        </h3>
        <p className="text-sm text-calico-black-500">
          根據肉球形狀分析性格特質
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.values(pawPersonalities).map((personality) => {
          const isSelected = selectedShape === personality.shape
          const isHovered = hoveredShape === personality.shape

          return (
            <button
              key={personality.shape}
              onClick={() => onSelect(personality.shape)}
              onMouseEnter={() => setHoveredShape(personality.shape)}
              onMouseLeave={() => setHoveredShape(null)}
              className={`
                relative p-6 rounded-3xl transition-all duration-300 touch-target
                ${isSelected 
                  ? 'bg-calico-orange-500 text-white shadow-xl scale-105' 
                  : 'bg-calico-white-50 border-2 border-calico-white-300 text-calico-black-700 hover:border-calico-orange-400 hover:shadow-lg'
                }
                ${isHovered && !isSelected ? 'scale-102' : ''}
              `}
            >
              {/* 肉球圖標 */}
              <div className="text-5xl mb-3">{personality.emoji}</div>
              
              {/* 形狀名稱 */}
              <h4 className="font-bold text-lg mb-2">{personality.name}</h4>
              
              {/* 性格特質 */}
              <div className="flex flex-wrap gap-1.5 justify-center mb-2">
                {personality.traits.slice(0, 3).map((trait, index) => (
                  <span
                    key={index}
                    className={`
                      px-2 py-0.5 rounded-full text-xs font-medium
                      ${isSelected 
                        ? 'bg-white/30 text-white' 
                        : 'bg-calico-orange-100 text-calico-orange-700'
                      }
                    `}
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* 選中標記 */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-calico-orange-500 text-sm">✓</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* 顯示選中形狀的詳細信息 */}
      {selectedShape && (
        <div className="mt-6 p-6 bg-calico-white-50 rounded-3xl border-2 border-calico-orange-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{pawPersonalities[selectedShape].emoji}</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-calico-black-700 mb-2">
                {pawPersonalities[selectedShape].name}
              </h4>
              <p className="text-sm text-calico-black-600 leading-relaxed mb-3">
                {pawPersonalities[selectedShape].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {pawPersonalities[selectedShape].traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-calico-orange-100 text-calico-orange-700 rounded-full text-xs font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
