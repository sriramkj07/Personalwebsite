export const metadata = {
  title: 'Essays'
};

import Link from 'next/link';

export default function Essays() {
  const businessEssays = [
    {
      href: "https://writing.nikunjk.com/p/product-management-prototype-management",
      title: "Nikunj Kothari's Product Management → Prototype management"
    },
    {
      href: "https://www.dreamsongs.com/WorseIsBetter.html",
      title: "Worse is Better by Richard P. Gabriel"
    },
    {
      href: "https://blog.samaltman.com/productivity",
      title: "Productivity by Sam Altman"
    }
  ];
  
  return (
    <main className="w-full max-w-2xl mx-auto p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold mb-12">Essays</h1>
      
      <div className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed whitespace-pre-line">
        {`I'm fascinated by interesting essays written by extremely smart people, which made sense and kept me hooked.

These essays have a high re-reability rate. I personally have went back to look, read, get inspired by them several times.

I also wanted a personal repository that I could just access immediately, and if it helps others get inspired, even better!

If you know of an interesting essay that can breakdown complex ideas into simple truths, drop me a note at `}
        <a
          href="mailto:kothandaraman.s@northeastern.edu"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          kothandaraman.s@northeastern.edu
        </a>
        .
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Business</h2>
      
      <ul className="space-y-4">
        {businessEssays.map((essay, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="text-gray-600 dark:text-gray-400 mt-1">•</span>
            <a
              href={essay.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:underline"
            >
              {essay.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}