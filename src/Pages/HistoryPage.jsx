import { useAnalysisStore } from '../Store/AnalysisStore'
import HistoryCard from '../Components/features/HistoryCard'

function EmptyState() {
  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-center text-gray-600 text-base">No analysis history yet. Start by creating a new analysis.</p>
    </div>
  )
}

export default function HistoryPage() {
  const { history } = useAnalysisStore()

  return (
    <div className="min-h-full bg-slate-100 px-6 py-20 sm:px-12 md:px-20 lg:px-20">
      <header className="mb-12 md:mb-16">
        <h1 className="m-0 mb-2 text-4xl font-bold text-black tracking-tight md:text-3xl">Analysis History</h1>
        <p className="m-0 max-w-3xl text-xl font-normal text-gray-500 leading-relaxed md:text-base">
          Review past analytical models, simulations, and generated insights from the intelligence engine.
        </p>
      </header>

      {history.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {history.map((item) => (
            <HistoryCard
              key={item.id}
              id={item.id}
              title={item.title || item.analysis?.businessConcept?.businessName || 'Untitled'}
              description={item.idea}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  )
}
