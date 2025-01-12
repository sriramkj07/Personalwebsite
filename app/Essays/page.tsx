export const metadata = {
  title: 'Essays'
};

import Link from 'next/link';

export default function Essays() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-16 lg:p-24 font-mono">
      <h1 className="text-3xl font-bold mb-6">Memos</h1>
      <p className="text-gray-600 mb-4">
        I'm fascinated by interesting memos written for an internal audience - a company, a campaign or even for the President. Raw, not smoothened over for PR departments, they help shed light on how people really think inside institutions.
      </p>
      <p className="text-gray-600 mb-4">
        These are challenging to find. They typically seem to come into the public domain in one of three ways: through being really old, being part of some lawsuit/legal process or, sadly, being part of a hack.
      </p>
      <p className="text-gray-600 mb-4">
        Each of the below are 'interesting' which I define broadly as either the impact they had, the quality of their writing or just helping shed light on how communication works in a different domain. If you know of an interesting memo in the public domain (or you have permission to share), drop me a note at sirram@sriramk.com.
      </p>
      <h2 className="text-2xl font-bold mb-4">Business</h2>
      <ul className="list-disc pl-6 text-gray-600 mb-6">
        <li>
          Stephen Elop's "Burning Platforms" Elop's call to action to Nokia on how they need to embrace a non-homegrown platform.
        </li>
        <li>
          Steve Jobs "Top 100" Steve Jobs talking about his agenda for Apple's top 100 leaders internal event.
        </li>
        <li>
          Steve Jobs negotiating ebook pricing Part of the infamous email thread where Steve is negotiating iBook pricing/access.
        </li>
        <li>
          Brad Garlinghouse "Peanut Butter" memo The famous internal memo to Yahoo from then-SVP Garlinghouse on focusing more on fewer efforts and having clearer accountability.
        </li>
        <li>
          Dave Goldberg to Michael Lynton on the state of the music industry.From the Sony
        </li>
      </ul>
      <p className="text-blue-600 mt-6">
        <Link href="sriramkj.com">Back to Home</Link>
      </p>
    </div>
  );
}
