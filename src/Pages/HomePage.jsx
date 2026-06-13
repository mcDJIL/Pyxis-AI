export default function HomePage() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-text-primary mb-3">
                        Good Morning!
                    </h2>
                    <p className="text-md text-slate-500">
                        What would you like to analyze today?
                    </p>
                </div>

                <div className="w-full max-w-lg">
                    <textarea name="analysis" id="analysis" placeholder="Enter your analysis query..." className="w-2xl border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
            </div>
        </div>
    )
}