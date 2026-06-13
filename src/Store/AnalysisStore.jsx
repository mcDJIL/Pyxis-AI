import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { uid } from '../Lib/Utils'

export const useAnalysisStore = create(
  persist(
    (set, get) => ({
      // ─── Current session ───────────────────────────────────────────
      currentIdea:    '',
      analysis:       null,    // { summary, swot, roadmap, prospect }
      isLoading:      false,
      error:          null,
      loadingSection: null,    // which section is regenerating

      // ─── History ───────────────────────────────────────────────────
      history: [],             // [{ id, title, idea, analysis, createdAt }]

      // ─── Settings ──────────────────────────────────────────────────
      apiKey: '',

      // ─── Actions ───────────────────────────────────────────────────
      setCurrentIdea: (text) => set({ currentIdea: text }),

      setAnalysis: (analysis) => {
        const { currentIdea, history } = get()
        const newEntry = {
          id:        uid(),
          title:     analysis.summary?.title || 'Analisis Bisnis',
          idea:      currentIdea,
          analysis,
          createdAt: new Date().toISOString(),
        }
        set({
          analysis,
          error: null,
          history: [newEntry, ...history].slice(0, 20), // keep latest 20
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

      setLoading:        (isLoading)      => set({ isLoading }),
      setError:          (error)          => set({ error }),
      setLoadingSection: (section)        => set({ loadingSection: section }),
      setApiKey:         (key)            => set({ apiKey: key }),

      loadFromHistory: (item) => set({
        currentIdea: item.idea,
        analysis:    item.analysis,
        error:       null,
      }),

      clearHistory: () => set({ history: [] }),

      reset: () => set({
        currentIdea:    '',
        analysis:       null,
        error:          null,
        isLoading:      false,
        loadingSection: null,
      }),
    }),
    {
      name:    'bizcode-store',
      // Only persist non-sensitive UI state + history + settings
      partialize: (state) => ({
        history: state.history,
        apiKey:  state.apiKey,
      }),
    }
  )
)