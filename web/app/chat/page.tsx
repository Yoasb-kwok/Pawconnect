'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import UserMenu from '../components/UserMenu'
import { useLanguage } from '@/contexts/LanguageContext'

// Demo conversations
const demoConversations = [
  {
    id: '1',
    name: 'Emily Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    lastMessage: '好的，明天下午2點見！',
    time: '10:30',
    unread: 2,
  },
  {
    id: '2',
    name: 'David Wong',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    lastMessage: '謝謝你的推薦！',
    time: '昨天',
    unread: 0,
  },
  {
    id: '3',
    name: 'Sarah Liu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: '你的狗狗好可愛！',
    time: '2天前',
    unread: 0,
  },
]

// Demo messages
const demoMessages: Record<string, any[]> = {
  '1': [
    {
      id: '1',
      sender: 'Emily Chen',
      content: '你好！我想預約明天的遛狗服務。',
      time: '09:00',
      isMe: false,
    },
    {
      id: '2',
      sender: 'You',
      content: '好的！明天下午2點可以嗎？',
      time: '09:05',
      isMe: true,
    },
    {
      id: '3',
      sender: 'Emily Chen',
      content: '好的，明天下午2點見！',
      time: '10:30',
      isMe: false,
    },
  ],
  '2': [
    {
      id: '1',
      sender: 'David Wong',
      content: '謝謝你的推薦！',
      time: '昨天',
      isMe: false,
    },
  ],
  '3': [
    {
      id: '1',
      sender: 'Sarah Liu',
      content: '你的狗狗好可愛！',
      time: '2天前',
      isMe: false,
    },
  ],
}

export default function ChatPage() {
  const { t } = useLanguage()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    demoConversations[0].id
  )
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentMessages = selectedConversation
    ? demoMessages[selectedConversation] || []
    : []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages])

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return

    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      content: message,
      time: new Date().toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: true,
    }

    if (!demoMessages[selectedConversation]) {
      demoMessages[selectedConversation] = []
    }
    demoMessages[selectedConversation].push(newMessage)

    setMessage('')
    scrollToBottom()
  }

  const selectedConv = demoConversations.find(
    (c) => c.id === selectedConversation
  )

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-calico-white-50 to-calico-white-100 flex flex-col md:flex-row overflow-x-hidden pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* Conversations List - 手機上未選對話時顯示，選中後在 md 以下隱藏 */}
      <div
        className={`w-full md:w-80 flex-shrink-0 bg-calico-white-50 border-r border-calico-white-300 flex flex-col ${
          selectedConversation && 'hidden md:flex'
        }`}
      >
        <div className="p-4 border-b border-calico-white-300 bg-calico-white-50/95 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-calico-black-700">{t('chat.title')} 💬</h1>
            <UserMenu />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {demoConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-3 md:p-4 flex items-center gap-3 hover:bg-calico-orange-50 active:scale-95 transition-all touch-target ${
                selectedConversation === conversation.id ? 'bg-calico-orange-100 border-l-4 border-calico-orange-500' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                  src={conversation.avatar}
                  alt={conversation.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                  unoptimized
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold truncate">{conversation.name}</p>
                  <span className="text-xs text-gray-500 ml-2">
                    {conversation.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-calico-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">
                  {conversation.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col min-h-0 min-w-0 ${!selectedConversation ? 'hidden md:flex' : ''}`}>
        {selectedConversation && selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="bg-calico-white-50/95 backdrop-blur-lg border-b border-calico-white-300 p-3 md:p-4 safe-area-inset-top flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-calico-black-600 hover:bg-calico-white-200"
                  aria-label={t('common.back')}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="w-10 h-10 rounded-full bg-calico-white-300 flex items-center justify-center overflow-hidden border-2 border-calico-orange-200 flex-shrink-0">
                  <Image
                    src={selectedConv.avatar}
                    alt={selectedConv.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-semibold text-calico-black-700">{selectedConv.name}</p>
                  <p className="text-xs text-calico-black-500">{t('chat.online')}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-4 space-y-3 md:space-y-4 min-h-0">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] md:max-w-md px-4 py-2.5 rounded-3xl ${
                      msg.isMe
                        ? 'bg-calico-orange-500 text-white'
                        : 'bg-calico-white-50 text-calico-black-700 shadow-md border border-calico-white-300'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{msg.content}</p>
                    <p
                      className={`text-xs mt-1.5 ${
                        msg.isMe ? 'text-calico-orange-100' : 'text-calico-black-500'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-calico-white-50/95 backdrop-blur-lg border-t border-calico-white-300 p-3 md:p-4 flex-shrink-0 safe-area-inset-bottom">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder={t('chat.inputPlaceholder')}
                  className="flex-1 px-4 py-2.5 md:py-2 border border-calico-white-300 rounded-full focus:outline-none focus:ring-2 focus:ring-calico-orange-500 bg-calico-white-50 text-sm md:text-base touch-target"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-calico-orange-500 text-white flex items-center justify-center hover:bg-calico-orange-600 active:scale-95 transition-all touch-target shadow-lg"
                >
                  <span className="text-lg md:text-xl">➤</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-600">{t('chat.selectConversation')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
