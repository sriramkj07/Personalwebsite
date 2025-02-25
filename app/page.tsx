import { ThemeSwitcher } from '@/components/theme-switcher'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Github, Linkedin, Calendar } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white p-4 md:p-16 lg:p-24 font-mono flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold">Sriram Kothandaraman</h1>
          <ThemeSwitcher />
        </div>

        <div className="relative">
          {/* Profile Image - Absolute positioned */}
          <div className="hidden md:block absolute right-0 top-0 w-40 h-40 rounded-full overflow-hidden">
            <Image
              src="/Sriram.jpeg"
              alt="Profile picture"
              width={160}
              height={160}
              className="object-cover"
            />
          </div>

          {/* Mobile Profile Image */}
          <div className="md:hidden w-32 h-32 rounded-full overflow-hidden mb-8">
            <Image
              src="/Sriram.jpeg"
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>

          {/* Content with right margin for image */}
          <div className="md:mr-48">
            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              <a href="mailto:sriramkj07@gmail.com" className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <a href="https://linkedin.com/in/sriramkj07" className="text-blue-500 hover:text-blue-600 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/sriramkj07" className="text-blue-500 hover:text-blue-600 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a href="https://topmate.io/sriramkj07" className="text-blue-500 hover:text-blue-600 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4" />
                <span>Topmate</span>
              </a>
            </div>

            {/* Bio Section */}
            <div className="space-y-6 text-lg">
              <h2 className="font-medium">Product Manager, Amateur Coder</h2>
              
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
      </div>
    </main>
  )
}
