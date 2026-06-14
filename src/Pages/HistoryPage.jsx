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

  console.log('Analysis History:', history)

  return (
    <div className="min-h-full p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
        <header className="mb-12 sm:mb-8">
            <h1 className="m-0 mb-2 text-4xl sm:text-2xl font-bold text-black tracking-tight">Analysis History</h1>
            <p className="m-0 max-w-3xl text-lg sm:text-sm font-normal text-gray-500 leading-relaxed">
            Review past analytical models, simulations, and generated insights from the intelligence engine.
            </p>
        </header>

        {history.length === 0 ? (
            <EmptyState />
        ) : (
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {history?.map((item) => (
                <HistoryCard
                key={item.id}
                id={item.id}
                title={item.analysis?.businessConcept?.businessName || item.title || 'Untitled'}
                description={item.analysis?.businessConcept?.description || 'No description available.'}
                createdAt={item.createdAt}
                />
            ))}
            </div>
        )}
        </div>
    </div>
  )
}
