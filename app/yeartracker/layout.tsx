export const metadata = {
  title: 'Year Tracker',
  description: 'Track the progress of the current year',
}

export default function YearTrackerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-900">
      {children}
    </div>
  )
}

