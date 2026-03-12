'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getPost, getComments, type Comment } from '@/lib/forum-demo-data'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ForumThreadPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const postId = params?.postId as string
  const post = postId ? getPost(postId) : undefined
  const initialComments = postId ? getComments(postId) : []
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [replyText, setReplyText] = useState('')

  const handleBack = () => {
    router.back()
  }

  const handleSendReply = () => {
    if (!replyText.trim() || !postId) return
    const newComment: Comment = {
      id: `c-${postId}-${Date.now()}`,
      author: { name: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You' },
      text: replyText.trim(),
      createdAt: '剛剛',
    }
    setComments((prev) => [...prev, newComment])
    setReplyText('')
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-calico-white-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-calico-black-600 mb-4">{t('forum.noPost')}</p>
          <button
            onClick={() => router.push('/forum')}
            className="px-4 py-2 rounded-full bg-calico-orange-500 text-white text-sm font-medium"
          >
            {t('forum.backToForum')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-calico-white-50 pb-32">
      {/* Header: back button top left */}
      <div className="bg-calico-white-50 border-b border-calico-white-300 sticky top-0 z-10 safe-area-inset-top">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 rounded-full text-calico-black-700 hover:bg-calico-white-200 active:scale-95 transition-colors touch-target"
              aria-label={t('common.back')}
            >
              <ArrowLeftIcon className="w-6 h-6" strokeWidth={2} />
            </button>
            <h1 className="text-lg font-bold text-calico-black-700">{t('forum.comments')}</h1>
          </div>
        </div>
      </div>

      {/* Post summary + comments */}
      <div className="max-w-2xl mx-auto">
        {/* Original post */}
        <div className="p-4 border-b border-calico-white-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-calico-white-300 flex-shrink-0 overflow-hidden">
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
          <p className="text-calico-black-700 text-base leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
          {post.location && (
            <p className="text-sm text-calico-black-500 mt-2 flex items-center gap-1">
              <span>📍</span> {post.location}
            </p>
          )}
        </div>

        {/* Comments list */}
        <div className="p-4">
          <p className="text-xs text-calico-black-500 mb-3">
            {comments.length > 0 ? t('forum.commentCount', { count: comments.length }) : t('forum.noComments')}
          </p>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-calico-white-300 flex-shrink-0 overflow-hidden">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-calico-black-700">{comment.author.name}</p>
                  <p className="text-sm text-calico-black-600">{comment.text}</p>
                  <p className="text-xs text-calico-black-400 mt-0.5">{comment.createdAt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply input */}
          <div className="flex gap-2 mt-6">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              placeholder={t('forum.replyPlaceholder')}
              className="flex-1 px-4 py-2.5 border border-calico-white-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-calico-orange-400 bg-calico-white-50"
            />
            <button
              type="button"
              onClick={handleSendReply}
              disabled={!replyText.trim()}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-calico-orange-500 text-white hover:bg-calico-orange-600 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
            >
              {t('common.send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
