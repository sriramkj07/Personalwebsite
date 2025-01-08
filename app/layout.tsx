import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Your Name - Personal Website',
  description: 'Engineer, Founder and Investor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  )
}
