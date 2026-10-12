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
      <h1 className="text-3xl font-bold mb-12">Watches I Love</h1>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        A few watches that caught my eye.
      </p>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {watches.map(watch => (
          <article key={watch.reference} className="py-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center shrink-0 w-full sm:w-40 h-56 sm:h-48 p-4">
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
            <div className="space-y-2">
              <h2 className="text-lg font-medium">{watch.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{watch.reference}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{watch.detail}</p>
              <a
                href={watch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
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
