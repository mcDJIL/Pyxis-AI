import { TrendingUp } from 'lucide-react'

export default function ProspectCard({
    prospect
}) {
    return (
        <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp />

                <h2 className="font-bold text-xl">
                    Business Prospect
                </h2>
            </div>

            <div className="text-5xl font-bold">
                {prospect?.score ?? 0}/100
            </div>

            <p className="mt-4 text-slate-600">
                {prospect?.description ?? 'No description available.'}
            </p>
        </div>
    )
}