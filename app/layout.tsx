import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
// app/layout.tsx
export const metadata = {
  title: 'Sriram Kothandaraman',
  description: 'A personal website, thats all folks'
}

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.className}>
      <body>{children}</body>
    </html>
  )
}
