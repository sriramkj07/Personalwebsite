import Image from 'next/image'
import Link from 'next/link'
import { Mail, Github, Linkedin, Calendar } from 'lucide-react'
import CalendarWidget from '@/components/CalendarWidget'

export default function Home() {
  return (
    <main className="w-full max-w-2xl mx-auto p-4 md:p-8 lg:p-12">
      {/* Header with Profile Image */}
      <div className="flex justify-between items-start mb-12">
        <div className="w-28 h-28 rounded-full overflow-hidden">
          <Image
            src="/Sriram.jpeg"
            alt="Profile picture"
            width={112}
            height={112}
            className="object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Name */}
        <h1 className="text-3xl font-bold">
          Sriram Kothandaraman
        </h1>

        {/* Social Links */}
        <div className="flex gap-6">
          <a href="mailto:kothandaraman.s@northeastern.edu" className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
          <a href="https://linkedin.com/in/sriramkj" className="text-blue-500 hover:text-blue-600 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/sriramkj07" className="text-blue-500 hover:text-blue-600 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a href="https://cal.com/sriramkj" className="text-blue-500 hover:text-blue-600 flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            <Calendar className="w-4 h-4" />
            <span>Cal.com</span>
          </a>
        </div>

        {/* Bio Section */}
        <div className="space-y-6">
          <h2 className="text-xl">Product Manager, Builder</h2>
          
          <p>
            I'm Sriram (Shri - Rahhm), I build products, I cycle, I love reading books and I have a fondness for stand-up com(ics)edy.
          </p>
          
          <p>
            I currently build products for ServiceNow. I hope to build amazing products that people (and their AI agents) love. 
          </p>
          
          <p>
            I hope to <Link href="/writing" className="text-blue-500 hover:text-blue-600">write</Link> about some of these interests and showcase my <Link href="/builds" className="text-blue-500 hover:text-blue-600">builds</Link>
          </p>
          
          <p>
            I'm currently based in San Francisco and previously spent time in Boston (where I went to Grad school) as well as in Chennai and Hyderabad.
          </p>
          
          <p>
            <Link href="/essays" className="text-blue-500 hover:text-blue-600">Essays</Link>: I also collect some essays that I personally think are influential and will be timeless
          </p>
        </div>
      </div>
      <CalendarWidget />
    </main>
  )
}
