import { useState } from 'react'
import {
  PenLine,
  SlidersHorizontal,
  Globe,
  Database,
  Trash2,
  Save,
  ChevronDown,
  RotateCcw,
  AlertCircle,
  Check,
} from 'lucide-react'
import { useAnalysisStore } from '../Store/AnalysisStore'

const DEPTH_LABELS = ['Summary', 'Standard', 'Deep Dive']

const LANGUAGES = [
  'English (US)',
  'Indonesian',
  'Spanish',
  'French',
  'German',
  'Japanese',
  'Korean',
  'Chinese (Simplified)',
]

const DEFAULT_CONFIG = {
  globalInstruction: '',
  swotDepth: 2,
  financialDepth: 1,
  language: 'English (US)',
}

function DepthSlider({ label, value, onChange }) {
  const fillPercent = (value / 2) * 100

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-black tracking-wide">{label}</span>
        <span className="text-xl font-semibold text-teal-700" style={{ letterSpacing: '-0.2px' }}>{DEPTH_LABELS[value]}</span>
      </div>
      <input
        type="range"
        min={0}
        max={2}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded cursor-pointer appearance-none bg-cover"
        style={{
          background: `linear-gradient(to right, #006A61 0%, #006A61 ${fillPercent}%, #D3E4FE ${fillPercent}%, #D3E4FE 100%)`,
        }}
      />
      <div className="flex justify-between text-xs text-gray-500">
        {DEPTH_LABELS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  )
}

function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sm:p-4 flex flex-col gap-0">
      <div className="flex items-center gap-3 mb-3">
        <Icon size={18} className="text-teal-700 flex-shrink-0" />
        <h2 className="text-lg sm:text-xl font-semibold text-black leading-snug">{title}</h2>
      </div>
      <p className="text-xs sm:text-sm font-normal text-gray-500 mb-6">{description}</p>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const settings = useAnalysisStore((state) => state.settings)
  const setSetting = useAnalysisStore((state) => state.setSetting)
  const clearHistory = useAnalysisStore((state) => state.clearHistory)
  const history = useAnalysisStore((state) => state.history)

  const [config, setConfig] = useState({
    ...DEFAULT_CONFIG,
    ...settings,
  })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  const set = (key, val) => setConfig((prev) => ({ ...prev, [key]: val }))

  const handleSave = () => {
    Object.keys(config).forEach((key) => {
      setSetting(key, config[key])
    })
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  const handleClearHistory = () => {
    clearHistory()
    setShowDeleteConfirm(false)
  }

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG)
    Object.keys(DEFAULT_CONFIG).forEach((key) => {
      setSetting(key, DEFAULT_CONFIG[key])
    })
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  return (
    <div className="min-h-full p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col gap-1 mb-12 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black leading-10 tracking-tight">AI Configuration</h1>
          <p className="text-base md:text-lg font-normal text-gray-500 leading-relaxed">
            Fine-tune the generative models and analytical parameters for your projects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10 lg:items-start sm:gap-4">
        {/* Bento Grid */}
          {/* ── Left Column ── */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Global Strategy Instruction */}
            <SectionCard
              icon={PenLine}
              title="Global Strategy Instruction"
              description="Define the brand persona or overarching strategic lens the AI should apply universally to all outputs."
            >
              <textarea
                className="w-full min-h-32 sm:min-h-24 p-3 border border-gray-300 rounded-xl text-base sm:text-sm text-black bg-white resize-vertical outline-none transition-all focus:border-teal-700 focus:ring-4 focus:ring-teal-700 focus:ring-opacity-10 placeholder:text-gray-400"
                placeholder="e.g., 'Act as a conservative financial advisor focusing on risk mitigation and sustainable long-term growth. Prioritize EBITDA margins over aggressive user acquisition...'"
                value={config.globalInstruction}
                onChange={(e) => set('globalInstruction', e.target.value)}
              />
            </SectionCard>

            {/* Analysis Depth Parameters */}
            <SectionCard
              icon={SlidersHorizontal}
              title="Analysis Depth Parameters"
              description="Adjust the verbosity and analytical depth for specific report sections."
            >
              <div className="flex flex-col gap-6">
                <DepthSlider
                  label="SWOT & Risk Assessment"
                  value={config.swotDepth}
                  onChange={(v) => set('swotDepth', v)}
                />
                <DepthSlider
                  label="Financial Projections"
                  value={config.financialDepth}
                  onChange={(v) => set('financialDepth', v)}
                />
              </div>
            </SectionCard>
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* Output Localization */}
            <SectionCard
              icon={Globe}
              title="Output Localization"
              description="Set the primary language for generated reports and data visualizations."
            >
              <div className="relative">
                <select
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-xl text-base sm:text-sm text-black bg-white appearance-none outline-none cursor-pointer transition-all focus:border-teal-700 focus:ring-4 focus:ring-teal-700 focus:ring-opacity-10"
                  value={config.language}
                  onChange={(e) => set('language', e.target.value)}
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </SectionCard>

            {/* Data Management */}
            <SectionCard
              icon={Database}
              title="Data Management"
              description={`You have ${history.length} saved analysis records.`}
            >
              {showDeleteConfirm ? (
                <div className="flex flex-col gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-900">Delete all history?</p>
                      <p className="text-xs text-red-700 mt-1">This action cannot be undone. All {history.length} analysis records will be permanently deleted.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleClearHistory}
                      className="flex-1 px-3 py-2 bg-red-700 text-white text-xs font-semibold rounded-lg hover:bg-red-800 transition-colors"
                    >
                      Delete All
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 px-3 py-2 bg-white border border-red-200 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={history.length === 0}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-red-700 rounded-xl text-sm font-semibold tracking-wide text-red-700 bg-transparent cursor-pointer transition-colors hover:bg-red-700 hover:bg-opacity-5 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
                >
                  <Trash2 size={14} />
                  Clear History
                </button>
              )}
            </SectionCard>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:gap-2">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 w-full px-4 sm:px-6 py-3 sm:py-3.5 border-none rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-teal-600 to-teal-800 shadow-sm cursor-pointer transition-opacity hover:opacity-90 relative"
              >
                {showSaved ? (
                  <>
                    <Check size={14} />
                    Settings Saved
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Save Configuration
                  </>
                )}
              </button>
              <button
                className="flex items-center justify-center gap-2 w-full px-4 sm:px-6 py-3 sm:py-3.5 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-black bg-transparent cursor-pointer transition-colors hover:bg-black hover:bg-opacity-3 hover:text-white"
                onClick={handleReset}
              >
                <RotateCcw size={14} />
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
