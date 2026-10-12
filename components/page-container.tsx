import type { ReactNode } from 'react'

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="w-full max-w-2xl mx-auto p-4 md:p-8 lg:p-12">
      {children}
    </main>
  )
}
