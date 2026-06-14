import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { uid } from '../Lib/Utils'

const initialAnalysis = {
  generatedAt: null,

  businessConcept: null,

  summary: null,
  swot: null,
  roadmap: null,
  prospect: null,

  competitorAnalysis: null,
  marketingStrategy: null,
  financialProjection: null,
}

export const useAnalysisStore = create(
  persist(
    (set, get) => ({
      // ─── Current session ───────────────────────────────────────────
      currentIdea: '',
      currentAnalysisId: null,
      analysis: {
        generatedAt: null,

        businessConcept: null,

        summary: null,
        swot: null,
        roadmap: null,
        prospect: null,

        competitorAnalysis: null,
        marketingStrategy: null,
        financialProjection: null,
      },

      isLoading: false,
      error: null,
      loadingSection: null,    // which section is regenerating

      // ─── History ───────────────────────────────────────────────────
      history: [],             // [{ id, title, idea, analysis, createdAt }]

      // ─── Settings ──────────────────────────────────────────────────
      apiKey: '',

      // ─── Actions ───────────────────────────────────────────────────
      setCurrentIdea: (text) => set({ currentIdea: text }),
      setCurrentAnalysisId: (id) => set({ currentAnalysisId: id }),

      setAnalysis: (analysis) => {
        const { currentIdea, history } = get()

        const newEntry = {
          id: uid(),
          title:
            analysis?.businessConcept?.businessName ||
            analysis?.summary?.title ||
            'Analisis Bisnis',
          idea: currentIdea,
          analysis,
          createdAt: new Date().toISOString(),
        }

        set({
          analysis,
          currentAnalysisId: newEntry.id,
          error: null,
          history: [newEntry, ...history].slice(0, 20),
        })
      },

      updateSection: (section, data) => {
        const { analysis, history } = get()
        if (!analysis) return
        const updated = { ...analysis, [section]: data }
        // Also update latest history entry
        const [latest, ...rest] = history
        const updatedHistory = latest
          ? [{ ...latest, analysis: updated }, ...rest]
          : history
        set({ analysis: updated, history: updatedHistory })
      },

      getLatestAnalysis: () => {
        const { history } = get()
        return history[0] || null
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setLoadingSection: (section) => set({ loadingSection: section }),
      setApiKey: (key) => set({ apiKey: key }),

      loadFromHistory: (item) => set({
        currentIdea: item.idea,
        currentAnalysisId: item.id,
        analysis: item.analysis,
        error: null,
      }),

      clearHistory: () => set({ history: [] }),

      deleteHistory: (id) =>
        set((state) => ({
          history: state.history.filter(
            item => item.id !== id
          ),
        })),

      reset: () => set({
        currentIdea: '',
        currentAnalysisId: null,

        analysis: initialAnalysis,

        error: null,
        isLoading: false,
        loadingSection: null,
      }),

      renameHistory: (id, title) =>
        set((state) => ({
          history: state.history.map(item =>
            item.id === id
              ? { ...item, title }
              : item
          ),
        })),
    }),
    {
      name: 'pyxis-store',
      // Only persist non-sensitive UI state + history + settings
      partialize: (state) => ({
        history: state.history,
        apiKey: state.apiKey,

        currentIdea: state.currentIdea,
        currentAnalysisId: state.currentAnalysisId,
        analysis: state.analysis,
      }),
    }
  )
)