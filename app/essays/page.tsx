export const metadata = {
  title: 'Essays'
};

import Link from 'next/link';

export default function Essays() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-16 lg:p-24 font-mono flex items-center justify-center">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Essays</h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          I'm fascinated by interesting essays written by extremely smart people, which also immediately made sense and kept me hooked to my chair. 
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          They also have a high re-reability rate, and I personally have went back to look, read, get inspired by them several times.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          I also wanted a personal repository that I could just access immediately, and if it helps others get inspired even better! If you know of an interesting essay you've read, drop me a note at <a href="mailto:kothandaraman.s@northeastern.edu" className="text-blue-600 underline">kothandaraman.s@northeastern.edu</a>.
        </p>
        <h2 className="text-2xl font-bold mb-4">Business</h2>
        <ul className="list-disc pl-8 text-gray-700 space-y-4">
          <li>
<a href= "Nikunj Kothari's Product Management ---> Prototype management">https://writing.nikunjk.com/p/product-management-prototype-management</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

