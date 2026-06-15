import React from 'react'
import SwotCard from './SwotCard'

import {
  TrendingUp,
  TrendingDown,
  Lightbulb,
  AlertTriangle,
  LayoutDashboard,
} from 'lucide-react'

const StrategicMatrix = ({ content }) => {

  if (!content) return null

  const swotCards = [
    {
      title: 'Strengths',
      icon: <TrendingUp size={18} />,
      themeColor: 'green',
      items: content.strengths || [],
    },
    {
      title: 'Weaknesses',
      icon: <TrendingDown size={18} />,
      themeColor: 'gray',
      items: content.weaknesses || [],
    },
    {
      title: 'Opportunities',
      icon: <Lightbulb size={18} />,
      themeColor: 'blue',
      items: content.opportunities || [],
    },
    {
      title: 'Threats',
      icon: <AlertTriangle size={18} />,
      themeColor: 'red',
      items: content.threats || [],
    },
  ]

  return (
    <div className="w-full">

      <div className="flex items-center gap-3 mb-4">
        <LayoutDashboard
          size={24}
          className="text-[#0059BB] sm:w-5 sm:h-5"
        />
        <h2 className="text-lg sm:text-xl font-bold">
          Strategic Matrix
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">

        {swotCards.map((card) => (
          <SwotCard
            key={card.title}
            title={card.title}
            icon={card.icon}
            themeColor={card.themeColor}
            items={card.items}
          />
        ))}

      </div>

    </div>
  )
}

export default StrategicMatrix
