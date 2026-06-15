import { TrendingUp, BarChart2, Award, FileArchive } from 'lucide-react'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

const INSIGHT_ICONS = {
  growth: TrendingUp,
  scalability: BarChart2,
  competitive: Award,
}

function ScoreRing({ score }) {
  return (
    <div className="flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full border-8 md:border-[12px] border-blue-700 bg-white flex-shrink-0">
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-4xl md:text-6xl font-bold text-gray-900 leading-none">
          {score}
        </span>
        <span className="text-xs md:text-sm font-semibold text-gray-900">
          OUT OF 10
        </span>
      </div>
    </div>
  )
}

function InsightItem({ insight }) {
  const Icon = INSIGHT_ICONS[insight.id] ?? TrendingUp
  return (
    <div className="flex items-start gap-3 md:gap-4 bg-white rounded-xl md:rounded-2xl p-3 md:p-4">
      <Icon size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
      <div className="flex flex-col gap-1">
        <h4 className="text-sm md:text-base font-semibold text-gray-900">
          {insight.title}
        </h4>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          {insight.description}
        </p>
      </div>
    </div>
  )
}

export default function ProspectCard({ prospect, businessName }) {
  const score = prospect?.score ?? 0
  const label = prospect?.label ?? ''
  const insights = prospect?.insights ?? []
  const legacyDescription = prospect?.description

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <FileArchive size={24} color="#0059BB" className="flex-shrink-0" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Business Prospects
        </h2>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8">
        {/* Card Top - Title and Badge */}
        <div className="flex items-center justify-between gap-4 mb-8 md:mb-10 flex-wrap">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            Analysis Score
          </h3>
          {label && (
            <span className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-medium text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-md">
              {label}
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 md:gap-10">
          {/* Score Ring */}
          <div className="flex items-center justify-center lg:justify-start">
            <ScoreRing score={score} />
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-gray-300"></div>
          <div className="lg:hidden h-px bg-gray-300"></div>

          {/* Insights */}
          <div className="flex-1 flex flex-col gap-3 md:gap-4">
            {insights.length > 0 ? (
              insights.map((insight) => (
                <InsightItem key={insight.id} insight={insight} />
              ))
            ) : legacyDescription ? (
              <p className="text-sm md:text-base text-gray-600 leading-relaxed p-3 md:p-4">
                {legacyDescription}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
