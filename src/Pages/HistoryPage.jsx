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
    <div className="min-h-full p-8">
        <div className="max-w-6xl mx-auto">
        <header className="mb-12">
            <h1 className="m-0 mb-2 text-4xl font-bold text-black tracking-tight md:text-3xl">Analysis History</h1>
            <p className="m-0 max-w-3xl text-xl font-normal text-gray-500 leading-relaxed md:text-base">
            Review past analytical models, simulations, and generated insights from the intelligence engine.
            </p>
        </header>

        {history.length === 0 ? (
            <EmptyState />
        ) : (
            <div className="grid gap-4 grid-cols-4 md:grid-cols-4 sm:grid-cols-1">
            {history?.map((item) => (
                <HistoryCard
                key={item.id}
                id={item.id}
                title={item.analysis?.analysis?.businessConcept?.businessName || 'Untitled'}
                description={item.analysis?.analysis?.businessConcept?.description || 'No description available.'}
                createdAt={item.createdAt}
                />
            ))}
            </div>
        )}
        </div>
    </div>
  )
}
