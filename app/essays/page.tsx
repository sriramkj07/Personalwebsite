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
    <div className="min-h-screen bg-white text-black p-8 md:p-16 lg:p-24 font-mono flex items-center justify-center">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Essays</h1>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          I'm fascinated by interesting essays written by extremely smart people, which made sense and kept me hooked. 
        </p>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          These essays have a high re-reability rate. I personally have went back to look, read, get inspired by them several times.
        </p>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          I also wanted a personal repository that I could just access immediately, and if it helps others get inspired, even better!
        </p>
        
        <p className="text-gray-700 mb-4 leading-relaxed"> 
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
        
        <ul className="space-y-4">
          {businessEssays.map((essay, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-gray-700 mt-1">•</span>
              <a 
                href={essay.href}
                className="text-gray-700 hover:text-gray-900 hover:underline"
              >
                {essay.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
