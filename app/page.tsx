import { ThemeSwitcher } from '@/components/theme-switcher'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-4 md:p-16 lg:p-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-mono">Sriram Kothandaraman</h1>
          <ThemeSwitcher />
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto">
            <Image
              src="/Sriram.jpeg"
              alt="Sriram Kothandaraman"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
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

          <h2 className="text-xl font-bold mb-4">Product Manager, Amateur Coder</h2>
          
          <div className="space-y-4">
            <p>
              I'm Sriram (Shri - Rahhm), I build products, I cycle, I love reading books and I have a fondness for stand-up com(ics)edy.
            </p>
            
            <p>
              I currently build products at ServiceNow. I'm fascinated by powerful network effects enabled by tech and how it disrupts traditional markets.
            </p>
            
            <p>
              I aspire to build such large scale platforms for the future.
            </p>
            
            <p>
              I hope to write about some of these interests and showcase my <Link href="/builds" className="text-blue-500 hover:text-blue-600">builds</Link>
            </p>
            
            <p>
              I'm currently based in San Francisco and previously spent time in Boston (where I went to Grad school) as well as in Chennai and Hyderabad.
            </p>
            
            <p>
              <Link href="/essays" className="text-blue-500 hover:text-blue-600">Essays</Link>: I also collect some essays that I personally think are influential and will be timeless
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
