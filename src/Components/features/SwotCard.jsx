import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const SwotCard = ({
  title,
  icon,
  items = [],
  themeColor,
}) => {
  const [expanded, setExpanded] = useState(false)

  const colorMap = {
    green: 'text-emerald-600 bg-emerald-50',
    gray: 'text-slate-600 bg-slate-50',
    blue: 'text-blue-600 bg-blue-50',
    red: 'text-red-600 bg-red-50',
  }

  const activeColor =
    colorMap[themeColor] || colorMap.gray

  const textColor =
    activeColor.split(' ')[0]

  return (
    <div
      className="
        flex flex-col
        p-5
        bg-white
        border border-gray-100
        rounded-xl
        shadow-sm
        min-h-[280px]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`p-2 rounded-md ${activeColor}`}
        >
          {icon}
        </div>

        <h3
          className={`font-semibold text-lg ${textColor}`}
        >
          {title}
        </h3>
      </div>

      {/* First 3 Items */}
      <ul className="flex flex-col gap-3">
        {items.slice(0, 3).map((item, index) => (
          <li
            key={index}
            className="
              flex items-start
              gap-3
              text-sm
              text-gray-600
            "
          >
            <span
              className={`mt-1.5 text-[10px] ${textColor}`}
            >
              {themeColor === 'green'
                ? '✔'
                : themeColor === 'red'
                ? '!'
                : '—'}
            </span>

            <span className="leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Expand Area */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-500
          ease-in-out
          ${
            expanded
              ? 'max-h-[500px] opacity-100 mt-3'
              : 'max-h-0 opacity-0'
          }
        `}
      >
        <ul className="flex flex-col gap-3">
          {items.slice(3).map((item, index) => (
            <li
              key={index}
              className="
                flex items-start
                gap-3
                text-sm
                text-gray-600
              "
            >
              <span
                className={`mt-1.5 text-[10px] ${textColor}`}
              >
                {themeColor === 'green'
                  ? '✔'
                  : themeColor === 'red'
                  ? '!'
                  : '—'}
              </span>

              <span className="leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Button */}
      {items.length > 3 && (
        <button
          onClick={() =>
            setExpanded(!expanded)
          }
          className="
            mt-4
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-teal-600
            hover:text-teal-700
            transition-all
            duration-300
            cursor-pointer
            self-start
          "
        >
          {expanded
            ? 'Hide Details'
            : `View All (${items.length})`}

          <ChevronDown
            size={16}
            className={`
              transition-transform
              duration-300
              ${
                expanded
                  ? 'rotate-180'
                  : ''
              }
            `}
          />
        </button>
      )}
    </div>
  )
}

export default SwotCard