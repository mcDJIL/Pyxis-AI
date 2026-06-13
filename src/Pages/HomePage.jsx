import { Sparkles, ArrowUp } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-3xl px-4">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-text-primary mb-3">
                        Good Morning!
                    </h2>
                    <p className="text-md text-slate-500">
                        What would you like to analyze today?
                    </p>
                </div>

                <div className="box-prompt bg-white rounded-xl border border-slate-200 shadow-lg p-4">
                    {/* Input Area */}
                    <Sparkles className='absolute' size={16} />
                    <textarea
                        placeholder="Ask AI to analyze your business idea..."
                        className="pl-6 w-full min-h-[140px] resize-none bg-transparent outline-none text-black placeholder:text-slate-400"
                    />

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between mt-4">
                        {/* Left Side */}
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

                        {/* Submit Button */}
                        <button
                            className="
                                w-10 h-10
                                rounded-full
                                bg-black
                                text-white
                                flex items-center justify-center
                                hover:scale-105
                                transition
                                button
                            "
                        >
                            <ArrowUp size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}