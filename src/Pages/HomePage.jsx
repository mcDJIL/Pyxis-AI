import { useState } from 'react'
import { Sparkles, ArrowUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAnalysisStore } from '../Store/AnalysisStore'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {
        setCurrentIdea,
        setAnalysis,
        setError,
        settings,
    } = useAnalysisStore()

    const handleSubmit = async () => {
        if (!prompt.trim()) return

        try {
            setLoading(true)
            setCurrentIdea(prompt)

            const response = await fetch(
                'http://localhost:5000/api/analyze-business',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idea: prompt,
                        settings,
                    }),
                }
            )

            const data = await response.json()

            if (data.success !== true) {
                throw new Error(data.message || 'Failed to analyze business idea')
            } else {
                setAnalysis(data.analysis)
                console.log('Analysis Result:', data.analysis)
                console.log('Full Response:', data)

                const newId = useAnalysisStore.getState().currentAnalysisId
                const latestAnalysis = useAnalysisStore.getState().getLatestAnalysis()
                console.log('Saved to Store:', latestAnalysis)

                toast.success('Analysis completed successfully!')
                navigate(`/dashboard/${newId}`)
            }
        } catch (error) {
            const errorMessage = error.message || 'Failed to analyze business idea'
            setError(errorMessage)
            toast.error(errorMessage)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-3xl px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-text-primary mb-3">
                        Good Morning!
                    </h2>

                    <p className="text-md text-slate-500">
                        What would you like to analyze today?
                    </p>
                </div>

                <div className="relative bg-white rounded-xl border border-slate-200 shadow-[0_0_8px_rgba(0,0,0,0.1)] p-4">
                    <Sparkles
                        className="absolute left-4 top-4 text-slate-400"
                        size={16}
                    />

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask AI to analyze your business idea..."
                        className="pl-7 w-full min-h-[140px] resize-none bg-transparent outline-none text-black placeholder:text-slate-400"
                    />

                    <div className="flex items-center justify-between mt-4">
                        <button
                            className="
                            flex items-center gap-2
                            px-3 py-2
                            rounded-full
                            bg-slate-100
                            hover:bg-slate-200
                            text-slate-700
                            transition
                        "
                        >
                            <span className="text-sm">
                                Analyze with AI
                            </span>
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="
                            w-10 h-10
                            rounded-full
                            bg-black
                            text-white
                            flex items-center justify-center
                            hover:scale-105
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <ArrowUp size={18} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
