/**
 * 肉球形狀性格分析系統
 * 狗狗爪子形狀：飯糰形、愛心形、火箭形、三角形、米粒形、小山形
 */

export type PawShape = 'onigiri' | 'heart' | 'rocket' | 'triangle' | 'rice_grain' | 'hill'

export interface PawPersonality {
  shape: PawShape
  name: string
  description: string
  traits: string[]
  compatibility: PawShape[]
  color: string
  emoji: string
}

/**
 * 肉球形狀性格分析（六種形狀）
 */
export const pawPersonalities: Record<PawShape, PawPersonality> = {
  onigiri: {
    shape: 'onigiri',
    name: '飯糰形',
    description: '肉球像飯糰一樣圓潤飽滿，性格溫和踏實，容易相處，是可靠的玩伴。',
    traits: ['溫和', '踏實', '親和', '穩定', '友善'],
    compatibility: ['heart', 'hill', 'rice_grain'],
    color: '#F5DEB3',
    emoji: '🍙',
  },
  heart: {
    shape: 'heart',
    name: '愛心形',
    description: '肉球呈愛心形，性格熱情友善，喜歡與人和其他寵物互動，是社交達人。',
    traits: ['友善', '熱情', '社交', '親人', '活潑'],
    compatibility: ['onigiri', 'heart', 'rocket'],
    color: '#FF6B6B',
    emoji: '❤️',
  },
  rocket: {
    shape: 'rocket',
    name: '火箭形',
    description: '肉球像火箭般有衝勁，性格活潑好動，精力充沛，喜歡探索與奔跑。',
    traits: ['活潑', '好動', '精力充沛', '好奇', '愛玩'],
    compatibility: ['heart', 'rocket', 'hill'],
    color: '#9C27B0',
    emoji: '🚀',
  },
  triangle: {
    shape: 'triangle',
    name: '三角形',
    description: '肉球呈三角形，性格獨立有主見，聰明機靈，是天生的小領袖。',
    traits: ['獨立', '聰明', '有主見', '自信', '領導'],
    compatibility: ['triangle', 'rice_grain', 'hill'],
    color: '#4A4A4A',
    emoji: '🔺',
  },
  rice_grain: {
    shape: 'rice_grain',
    name: '米粒形',
    description: '肉球細長如米粒，性格細膩敏感，溫柔體貼，善解人意。',
    traits: ['細膩', '溫柔', '體貼', '敏感', '善解人意'],
    compatibility: ['onigiri', 'heart', 'rice_grain'],
    color: '#E8DCC4',
    emoji: '🌾',
  },
  hill: {
    shape: 'hill',
    name: '小山形',
    description: '肉球像小山一樣穩重，性格沉穩可靠，給人安全感，是可靠的夥伴。',
    traits: ['沉穩', '可靠', '穩重', '安心', '包容'],
    compatibility: ['onigiri', 'rocket', 'triangle'],
    color: '#8B7355',
    emoji: '⛰️',
  },
}

/**
 * 根據肉球形狀分析性格
 */
export function analyzePawPersonality(shape: PawShape): PawPersonality {
  return pawPersonalities[shape]
}

/**
 * 計算配對兼容性
 */
export function calculateCompatibility(
  shape1: PawShape,
  shape2: PawShape
): number {
  const personality1 = pawPersonalities[shape1]
  const personality2 = pawPersonalities[shape2]

  const isCompatible =
    personality1.compatibility.includes(shape2) ||
    personality2.compatibility.includes(shape1)

  let score = isCompatible ? 70 : 50

  if (shape1 === shape2) {
    score += 20
  }

  return Math.min(100, score)
}

/**
 * 獲取肉球形狀的視覺化 SVG
 */
export function getPawShapeSVG(shape: PawShape, size: number = 100): string {
  const svgs: Record<PawShape, string> = {
    onigiri: `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100">
        <ellipse cx="50" cy="55" rx="35" ry="30" fill="#F5DEB3" stroke="#DEB887" stroke-width="2"/>
      </svg>
    `,
    heart: `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100">
        <path d="M50,85 C50,85 20,60 20,40 C20,25 30,15 50,15 C70,15 80,25 80,40 C80,60 50,85 50,85 Z" 
              fill="#FF6B6B" stroke="#FF5252" stroke-width="2"/>
      </svg>
    `,
    rocket: `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100">
        <path d="M50,15 L80,75 L50,85 L20,75 Z" fill="#9C27B0" stroke="#7B1FA2" stroke-width="2"/>
      </svg>
    `,
    triangle: `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100">
        <polygon points="50,20 20,80 80,80" fill="#4A4A4A" stroke="#2C2C2C" stroke-width="2"/>
      </svg>
    `,
    rice_grain: `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="25" ry="40" fill="#E8DCC4" stroke="#C4B896" stroke-width="2"/>
      </svg>
    `,
    hill: `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100">
        <path d="M20,80 L50,30 L80,80 Z" fill="#8B7355" stroke="#6B5344" stroke-width="2"/>
      </svg>
    `,
  }
  return svgs[shape]
}
