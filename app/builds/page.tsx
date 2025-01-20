export const metadata = {
  title: 'Builds - Sriram Kothandaraman'
};

export default function Builds() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-16 lg:p-24 font-mono">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Builds</h1>
        <p className="text-gray-600">
          A collection of things I've built, from small weekend projects to more substantial applications.
        </p>
        
        <div className="space-y-8">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Year Tracker</h2>
            <p className="text-gray-600 mb-4">
              A live year tracker counter that shows you how much percentage of the year is done and how much is remaining. Built with Next.js and React.
            </p>
            <a 
              href="/yeartracker" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              View Project →
            </a>
<div className="space-y-8">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Year Tracker</h2>
            <p className="text-gray-600 mb-4">
              An AI travel agent to help you plan, book, and supercharge your adventure
            </p>
            <a href="https://payanamhq.com/" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              View Project →
            </a>
</div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

