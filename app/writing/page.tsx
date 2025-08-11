import Link from 'next/link'

export default function Writing() {
  return (
    <main className="w-full max-w-2xl mx-auto p-4 md:p-8 lg:p-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-8">Writing</h1>
        
        <p className="text-black dark:text-600 mb-8">
          Welcome to my collection of writings on product management, technology, and personal interests.
        </p>

        <div className="space-y-6">
          <article className="group">
            <Link 
              href="https://www.mindtheproduct.com/how-to-implement-effective-ai-evaluations/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-blue-500 group-hover:text-blue-600">
                  A guide on implementing effective AI evaluations
                </h3>
                <time className="text-sm text-gray-500">June 2025</time>
              </div>
            </Link>
          </article>
        </div>
      </div>
    </main>
  )
}
