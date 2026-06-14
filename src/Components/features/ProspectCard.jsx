import { TrendingUp, BarChart2, Award, Map } from 'lucide-react'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

const INSIGHT_ICONS = {
  growth: TrendingUp,
  scalability: BarChart2,
  competitive: Award,
}

function ScoreRing({ score }) {
  return (
    <div className="prospect-score-ring">
      <div className="prospect-score-text">
        <span className="prospect-score-number">{score}</span>
        <span className="prospect-score-out-of">OUT OF 10</span>
      </div>
    </div>
  )
}

function InsightItem({ insight }) {
  const Icon = INSIGHT_ICONS[insight.id] ?? TrendingUp
  return (
    <div className="prospect-insight-item">
      <Icon size={20} className="prospect-insight-icon" />
      <div className="prospect-insight-content">
        <h4 className="prospect-insight-title">{insight.title}</h4>
        <p className="prospect-insight-desc">{insight.description}</p>
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
    <section className="prospect-section">
      <div className="prospect-section-header">
        <Map size={24} color="#0059BB" />
        <h2 className="prospect-section-title">Business Prospects</h2>
      </div>

      <div className="prospect-card">
        <div className="prospect-card-top">
          <h3 className="prospect-analysis-title">Analysis Score</h3>
          {label && (
            <span className="prospect-potential-badge">{label}</span>
          )}
        </div>

        <div className="prospect-card-body">
          <div className="prospect-left-panel">
            <ScoreRing score={score} />
          </div>

          <div className="prospect-divider" />

          <div className="prospect-right-panel">
            {insights.length > 0 ? (
              insights.map((insight) => (
                <InsightItem key={insight.id} insight={insight} />
              ))
            ) : legacyDescription ? (
              <p className="prospect-legacy-desc">{legacyDescription}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}