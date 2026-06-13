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
} from 'lucide-react'

const DEPTH_LABELS = ['Summary', 'Standard', 'Deep Dive']

const LANGUAGES = [
  'English (US)',
  'Indonesian',
  'Spanish',
  'French',
  'German',
  'Japanese',
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
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col gap-0">
      <div className="flex items-center gap-3 mb-3">
        <Icon size={18} className="text-teal-700 flex-shrink-0" />
        <h2 className="text-xl font-semibold text-black leading-snug">{title}</h2>
      </div>
      <p className="text-sm font-normal text-gray-500 mb-6">{description}</p>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)

  const set = (key, val) => setConfig((prev) => ({ ...prev, [key]: val }))

  return (
    <div className="min-h-full p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col gap-1 mb-12">
          <h1 className="text-4xl font-bold text-black leading-10 tracking-tight md:text-3xl sm:text-2xl">AI Configuration</h1>
          <p className="text-lg font-normal text-gray-500 leading-relaxed md:text-base sm:text-sm">
            Fine-tune the generative models and analytical parameters for your projects.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10 lg:items-start">
          {/* ── Left Column ── */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Global Strategy Instruction */}
            <SectionCard
              icon={PenLine}
              title="Global Strategy Instruction"
              description="Define the brand persona or overarching strategic lens the AI should apply universally to all outputs."
            >
              <textarea
                className="w-full min-h-40 p-3 border border-gray-300 rounded-xl text-base text-black bg-white resize-vertical outline-none transition-all focus:border-teal-700 focus:ring-4 focus:ring-teal-700 focus:ring-opacity-10 placeholder:text-gray-400"
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
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-xl text-base text-black bg-white appearance-none outline-none cursor-pointer transition-all focus:border-teal-700 focus:ring-4 focus:ring-teal-700 focus:ring-opacity-10"
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
              description="Manage your stored analysis data and local cache to free up space or remove old records."
            >
              <button className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-red-700 rounded-xl text-sm font-semibold tracking-wide text-red-700 bg-transparent cursor-pointer transition-colors hover:bg-red-700 hover:bg-opacity-5 hover:text-white">
                <Trash2 size={14} />
                Clear History
              </button>
            </SectionCard>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 w-full px-6 py-3.5 border-none rounded-xl text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-teal-600 to-teal-800 shadow-sm cursor-pointer transition-opacity hover:opacity-90">
                <Save size={14} />
                Save Configuration
              </button>
              <button
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 border border-gray-300 rounded-xl text-sm font-semibold tracking-wide text-black bg-transparent cursor-pointer transition-colors hover:bg-black hover:bg-opacity-3 hover:text-white"
                onClick={() => setConfig(DEFAULT_CONFIG)}
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
