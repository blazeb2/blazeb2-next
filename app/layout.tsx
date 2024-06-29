import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export const metadata: Metadata = {
  title: 'Home | Blazeb2 Imgur',
  description: 'Blazeb2 Image Management',
  icons: '/favicon.ico',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scrollbar-thin scrollbar-w-8 dark">
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable,
        'font-hs',
        'bg-[--b2-bg-color]',
        'text-[--b2-text-color]',
        'overflow-hidden',
        'h-full',
        'w-full',
      )}
      >
        {children}
      </body>
    </html>
  )
}
