import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: {
    template: '%s | Tools',
    default: 'Tools',
  },
  description: '이미지 툴',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
