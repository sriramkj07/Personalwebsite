import { ThemeSwitcher } from '@/components/theme-switcher'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white p-4 md:p-16 lg:p-24 font-mono flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sriram Kothandaraman</h1>
          <ThemeSwitcher />
        </div>

        <div>
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <Image
              src="/Sriram.jpeg"
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex gap-4 mt-6 justify-center">
          <a href="mailto:sriramkj07@gmail.com" className="text-blue-500 hover:text-blue-600">
            Email
          </a>
          <a href="https://linkedin.com/in/sriramkj07" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/sriramkj07" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://topmate.io/sriramkj07" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            Topmate
          </a>
        </div>

        {/* Bio Section */}
        <div className="space-y-4 mt-8 text-left">
          <p className="text-lg">
            Product Manager, Amateur Coder
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            I'm Sriram (Shri - Rahhm), I build products, I cycle, I love reading books and I have a fondness for stand-up com(ics)edy.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            I currently build products at ServiceNow. I'm fascinated by powerful network effects enabled by tech and how it disrupts traditional markets.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            I aspire to build such large scale platforms for the future.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            I hope to write about some of these interests and showcase my <Link href="/builds" className="text-blue-500 hover:text-blue-600">builds</Link>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            I'm currently based in San Francisco and previously spent time in Boston (where I went to Grad school) as well as in Chennai and Hyderabad.
          </p>
          <p>
            <Link href="/essays" className="text-blue-500 hover:text-blue-600">Essays</Link>
            <span className="text-gray-600 dark:text-gray-400">
              : I also collect some essays that I personally think are influential and will be timeless
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}
