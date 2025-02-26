import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from '@/components/footer'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: 'Sriram Kothandaraman',
  description: 'Product Manager, Amateur Coder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white flex flex-col">
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
