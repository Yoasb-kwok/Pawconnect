'use client'

interface SwipeButtonsProps {
  onPass: () => void
  onLike: () => void
  onSuperLike: () => void
}

export default function SwipeButtons({
  onPass,
  onLike,
  onSuperLike,
}: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6">
      <button
        onClick={onPass}
        className="touch-target w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center active:scale-95 hover:scale-110 transition-transform border-2 border-gray-200"
      >
        <span className="text-2xl md:text-3xl">👎</span>
      </button>

      <button
        onClick={onSuperLike}
        className="touch-target w-14 h-14 md:w-16 md:h-16 rounded-full bg-bird-500 shadow-lg flex items-center justify-center active:scale-95 hover:scale-110 transition-transform text-white"
      >
        <span className="text-xl md:text-2xl">⭐</span>
      </button>

      <button
        onClick={onLike}
        className="touch-target w-16 h-16 md:w-20 md:h-20 rounded-full bg-calico-orange-500 shadow-lg flex items-center justify-center active:scale-95 hover:scale-110 transition-transform text-white"
      >
        <span className="text-3xl md:text-4xl">❤️</span>
      </button>
    </div>
  )
}
