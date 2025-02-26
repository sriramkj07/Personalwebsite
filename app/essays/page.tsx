export const metadata = {
  title: 'Essays' 
};

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';

const businessEssays = [
  {
    title: "Nikunj Kothari's Product Management → Prototype management",
    author: "",
    link: "https://writing.nikunjk.com/p/product-management-prototype-management"
  },
  {
    title: "Worse is Better",
    author: "Richard P. Gabriel",
    link: "https://www.dreamsongs.com/WorseIsBetter.html"
  },
  {
    title: "Productivity",
    author: "Sam Altman",
    link: "https://blog.samaltman.com/productivity"
  }
];

export default function Essays() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white p-8 md:p-16 lg:p-24 font-mono flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header with Theme Switcher */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Essays</h1>
          <ThemeSwitcher />
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          I'm fascinated by interesting essays written by extremely smart people, which made sense and kept me hooked. 
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          These essays have a high re-reability rate. I personally have went back to look, read, get inspired by them several times.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          I also wanted a personal repository that I could just access immediately, and if it helps others get inspired, even better!
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"> 
          If you know of an interesting essay that can breakdown complex ideas into simple truths, drop me a note at{' '}
          <a 
            href="mailto:kothandaraman.s@northeastern.edu" 
            className="text-blue-600 hover:underline"
          >
            kothandaraman.s@northeastern.edu
          </a>
          .
        </p>
        
        <h2 className="text-2xl font-bold mb-4">Business</h2>
        
        <div className="space-y-6">
          {businessEssays.map((essay, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-800 pb-4">
              <a 
                href={essay.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 block mb-1"
              >
                {essay.title}
              </a>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                by {essay.author}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
