import type { Metadata } from 'next'
import { PageContainer } from '@/components/page-container'
import Image from 'next/image'
import { getWatches } from './collection'

export const metadata: Metadata = {
  title: 'Watches I Love',
  description: 'A personal collection of watches I love.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  referrer: 'no-referrer',
}

export default function WatchesILove() {
  const watches = getWatches()
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-4">Watches I Love</h1>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        A few watches that caught my eye.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6">
        {watches.map(watch => (
          <article key={watch.reference} className="min-w-0 flex flex-col gap-3">
            <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center shrink-0 w-full h-44 sm:h-48 p-3 sm:p-4">
              <Image
                src={watch.image}
                alt={watch.name}
                width={160}
                height={200}
                unoptimized
                className="w-full h-full object-contain"
                style={{ transform: `scale(${watch.imageScale ?? 1})` }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h2 className="text-base font-medium">{watch.name}</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 break-words">{watch.reference}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{watch.detail}</p>
              <a
                href={watch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto pt-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                aria-label={`View ${watch.name} on the official website`}
              >
                Official page ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  )
}
