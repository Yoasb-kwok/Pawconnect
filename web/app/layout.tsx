import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Navigation from './components/Navigation'

export const metadata: Metadata = {
  title: '肉球不滿 Too Cute To Handle - 寵物交友平台',
  description: '為你的毛孩尋找玩伴，分享寵物友善地點，一站式寵物服務平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Navigation />
        </Providers>
      </body>
    </html>
  )
}
