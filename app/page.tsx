import Image from 'next/image'
import { Github, Linkedin, Mail } from 'lucide-react'  // Note the exact capitalization

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-16 lg:p-24 font-mono">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="space-y-4">
          <div className="w-32 h-32 rounded-full overflow-hidden">
      <Image
  src="/Sriram.jpeg"  // Make sure this matches your image filename exactly
  alt="Profile picture"
  width={128}
  height={128}
  className="object-cover"
/>
          </div>
          <h1 className="text-3xl font-bold">Sriram Kothandaraman</h1>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a 
            href="mailto:kothandaraman.s@northeastern.edu"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Email
          </a>
          <a 
            href="https://www.linkedin.com/in/sriramkj/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
          <a 
            href="https://github.com/sriramkj07"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
        </div>

        {/* Bio Section */}
        <div className="space-y-4">
          <p className="text-lg">
            Product Manager, Tech-nerd, Amateur Coder
          </p>
          
          <div className="space-y-4 text-gray-600">
  <p style={{ whiteSpace: 'pre-line' }}>
    {`Hi there 👋

    I'm Sriram (Shri - Rahhm), I build products, I cycle, I love reading books and I have a great fondness for stand-up com(ics)edy.

    I currently build products at ServiceNow. I'm fascinated by powerful network effects enabled by tech and how it disrupts traditional markets.

    I aspire to build such large scale platforms for the future.

    I hope to write about some of these interests and showcase my builds. 
    
    I’m currently based in San Francisco and previously spent time in Boston, where I attended Grad School, as well as in Chennai and Hyderabad`}
  </p>
</div>
        </div>
      </div>
    </div>
  )
}
