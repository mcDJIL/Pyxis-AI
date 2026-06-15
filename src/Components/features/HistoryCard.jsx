import { Link } from 'react-router-dom'

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.11667 6H0V4.66667H8.11667L4.38333 0.933333L5.33333 0L10.6667 5.33333L5.33333 10.6667L4.38333 9.73333L8.11667 6Z"
      fill="#0059BB"
    />
  </svg>
)

function formatDate(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function HistoryCard({ id, title, description, createdAt }) {
  return (
    <div className="flex flex-col justify-between min-h-80 sm:min-h-64 p-7 sm:p-4 rounded-2xl bg-white/70 shadow-sm backdrop-blur-xl">
      <div className="flex-1">
        <h3 className="m-0 mb-2 text-lg sm:text-2xl font-semibold text-slate-900 leading-snug">{title}</h3>
        <p className="m-0 mb-5 sm:mb-3 text-xs sm:text-sm font-medium text-gray-600 tracking-wide">{formatDate(createdAt)}</p>
        <p className="m-0 text-sm sm:text-base font-normal text-gray-600 leading-snug line-clamp-4">{description}</p>
      </div>

      <div className="pt-3 sm:pt-5 mt-4 sm:mt-6 border-t border-gray-300">
        <Link to={`/dashboard/${id}`} className="inline-flex items-center gap-1.5 text-blue-700 text-xs sm:text-sm font-medium tracking-wide hover:opacity-75 transition-opacity duration-150 no-underline">
          <span className="sm:hidden">View Analysis</span>
          <span className="hidden sm:inline">View</span>
          <ArrowIcon />
        </Link>
      </div>
    </div>
  )
}
