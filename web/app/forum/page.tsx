'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import UserMenu from '../components/UserMenu'
import { useLanguage } from '@/contexts/LanguageContext'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon, LinkIcon } from '@heroicons/react/24/outline'
import { demoPosts, type Post } from '@/lib/forum-demo-data'

const presetTags = ['寵物友善', '咖啡廳', '公園', '遛狗地點', '寵物用品', '美容', '貓咪', '狗狗']

const presetLocations = [
  '中環, 香港',
  '銅鑼灣, 香港',
  '旺角, 香港',
  '尖沙咀, 香港',
  '沙田, 香港',
  '觀塘, 香港',
]

function ForumPageContent() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<Post[]>(demoPosts)
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostImage, setNewPostImage] = useState('')
  const [newPostTags, setNewPostTags] = useState<string[]>([])
  const [newPostLocation, setNewPostLocation] = useState('')
  const [customTag, setCustomTag] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const searchParams = useSearchParams()
  useEffect(() => {
    if (searchParams.get('new') === '1') setShowCreateForm(true)
  }, [searchParams])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + (post.liked ? -1 : 1), liked: !(post.liked ?? false) }
          : post
      )
    )
  }

  const toggleTag = (tag: string) => {
    setNewPostTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }

  const handleAddCustomTag = () => {
    const trimmed = customTag.trim()
    if (!trimmed) return
    if (!newPostTags.includes(trimmed)) {
      setNewPostTags([...newPostTags, trimmed])
    }
    setCustomTag('')
  }

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return

    const post = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: newPostContent,
      location: newPostLocation,
      images: newPostImage ? [newPostImage] : [],
      tags: newPostTags,
      likes: 0,
      comments: 0,
      createdAt: '剛剛',
      liked: false,
    }

    setPosts([post, ...posts])
    setNewPostContent('')
    setNewPostImage('')
    setNewPostTags([])
    setNewPostLocation('')
    setCustomTag('')
    setShowCreateForm(false)
  }

  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      {/* Header - Threads 風格：簡潔頂部 */}
      <div className="bg-calico-white-50 border-b border-calico-white-300 sticky top-0 z-10 safe-area-inset-top">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <h1 className="text-xl font-bold text-calico-black-700">{t('forum.title')}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-4 py-1.5 text-sm font-medium text-calico-black-700 hover:text-calico-orange-500 transition-colors touch-target"
              >
                {showCreateForm ? t('forum.cancelPost') : t('forum.post')}
              </button>
              <UserMenu />
            </div>
          </div>

          {/* Create Post Form - Threads 風格：簡潔表單 */}
          {showCreateForm && (
            <div className="mt-4 p-4 bg-calico-white-50 border-t border-calico-white-300">
              {/* 內容 - Threads 風格：大文字框 */}
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder={t('forum.placeholder')}
                className="w-full px-0 py-2 border-0 focus:outline-none resize-none text-base md:text-lg bg-transparent placeholder:text-calico-black-400 mb-3"
                rows={6}
                autoFocus
              />

              {/* 附件選項 - Threads 風格：底部工具欄 */}
              <div className="flex items-center gap-4 pt-3 border-t border-calico-white-300">
                {/* 圖片 */}
                <button
                  type="button"
                  className="flex items-center gap-2 text-calico-black-500 hover:text-calico-orange-500 transition-colors touch-target"
                >
                  <span className="text-xl">📷</span>
                  <span className="text-sm">{t('forum.photo')}</span>
                </button>
                {/* 地點 */}
                <button
                  type="button"
                  className="flex items-center gap-2 text-calico-black-500 hover:text-calico-orange-500 transition-colors touch-target"
                >
                  <span className="text-xl">📍</span>
                  <span className="text-sm">{t('forum.location')}</span>
                </button>
                {/* Hashtag */}
                <button
                  type="button"
                  className="flex items-center gap-2 text-calico-black-500 hover:text-calico-orange-500 transition-colors touch-target"
                >
                  <span className="text-xl">#</span>
                  <span className="text-sm">{t('forum.tag')}</span>
                </button>
              </div>

              {/* 展開的選項（點擊後顯示） */}
              {(newPostImage || newPostLocation || newPostTags.length > 0) && (
                <div className="mt-4 space-y-3 pt-4 border-t border-calico-white-300">
                  {/* 圖片輸入 */}
                  {newPostImage && (
                    <div>
                      <input
                        type="text"
                        value={newPostImage}
                        onChange={(e) => setNewPostImage(e.target.value)}
                        placeholder="圖片網址"
                        className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-calico-orange-400 text-sm bg-calico-white-50"
                      />
                    </div>
                  )}

                  {/* 地點輸入 */}
                  {newPostLocation && (
                    <div>
                      <select
                        value={newPostLocation}
                        onChange={(e) => setNewPostLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-calico-orange-400 text-sm bg-calico-white-50 mb-2"
                      >
                        <option value="">選擇地點</option>
                        {presetLocations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={newPostLocation}
                        onChange={(e) => setNewPostLocation(e.target.value)}
                        placeholder="或輸入地址"
                        className="w-full px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-calico-orange-400 text-sm bg-calico-white-50"
                      />
                    </div>
                  )}

                  {/* Hashtag */}
                  {newPostTags.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {presetTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-full text-xs border transition-colors touch-target ${
                              newPostTags.includes(tag)
                                ? 'bg-calico-orange-500 text-white border-calico-orange-500'
                                : 'bg-calico-white-50 text-calico-black-700 border-calico-white-300 hover:bg-calico-orange-100'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customTag}
                          onChange={(e) => setCustomTag(e.target.value)}
                          placeholder="新增標籤"
                          className="flex-1 px-3 py-2 border border-calico-white-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-calico-orange-400 text-sm bg-calico-white-50"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomTag}
                          className="px-3 py-2 bg-calico-orange-500 text-white rounded-lg text-sm hover:bg-calico-orange-600 touch-target"
                        >
                          新增
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 發布按鈕 - Threads 風格：右下角 */}
              <div className="flex justify-end mt-4 pt-4 border-t border-calico-white-300">
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all touch-target ${
                    newPostContent.trim()
                      ? 'bg-calico-black-700 text-white hover:bg-calico-black-800 active:scale-95'
                      : 'bg-calico-white-300 text-calico-black-400 cursor-not-allowed'
                  }`}
                >
                  {t('forum.publish')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Posts - Threads 風格：簡潔列表 */}
      <div className="max-w-2xl mx-auto">
        <div className="divide-y divide-calico-white-300">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 hover:bg-calico-white-100/50 transition-colors"
            >
              {/* 第一行：頭像、用戶名、發文時間 */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-calico-white-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
                <p className="font-semibold text-calico-black-700 text-sm">{post.author.name}</p>
                <span className="text-calico-black-400 text-xs">·</span>
                <p className="text-xs text-calico-black-500">{post.createdAt}</p>
              </div>

              {/* 內文、圖片等：全寬向左對齊 */}
              <div className="space-y-2">
                <p className="text-calico-black-700 whitespace-pre-wrap text-base leading-relaxed">
                  {post.content}
                </p>

                {/* Images */}
                {post.images && post.images.length > 0 && (
                  <div className="rounded-2xl overflow-hidden">
                    <Image
                      src={post.images[0]}
                      alt="Post image"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      unoptimized
                    />
                  </div>
                )}

                {/* Location */}
                {post.location && (
                  <div className="flex items-center gap-2 text-sm text-calico-black-600">
                    <span>📍</span>
                    <span>{post.location}</span>
                  </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm text-calico-orange-600 hover:underline cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 底部操作欄 - 黑線圖示（無圓框）；心心按讚後填滿紅色 */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 touch-target transition-colors hover:opacity-80"
                >
                  {post.liked ? (
                    <HeartSolid className="w-6 h-6 text-red-500 flex-shrink-0" />
                  ) : (
                    <HeartOutline className="w-6 h-6 text-calico-black-700 flex-shrink-0" strokeWidth={2} />
                  )}
                  {post.likes > 0 && (
                    <span className="text-sm font-medium text-calico-black-700">{post.likes}</span>
                  )}
                </button>
                <Link
                  href={`/forum/${post.id}`}
                  className="flex items-center gap-1.5 touch-target transition-colors hover:opacity-80 text-calico-black-700"
                >
                  <ChatBubbleLeftIcon
                    className="w-6 h-6 flex-shrink-0"
                    strokeWidth={2}
                  />
                  {post.comments > 0 && (
                    <span className="text-sm font-medium">{post.comments}</span>
                  )}
                </Link>
                <button className="flex items-center gap-1.5 touch-target transition-colors hover:opacity-80">
                  <LinkIcon className="w-6 h-6 text-calico-black-700 flex-shrink-0" strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ForumPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-calico-white-50 pb-32 flex items-center justify-center text-calico-black-500">
          載入中...
        </div>
      }
    >
      <ForumPageContent />
    </Suspense>
  )
}
