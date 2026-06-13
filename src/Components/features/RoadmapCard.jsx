// Components/features/RoadmapCard.jsx

import React from 'react';

// Prop 'position' dihapus karena penempatan kiri/kanan diatur oleh komponen induk
const RoadmapCard = ({ data, onClick }) => {
  const { title, themeColor, summaryText } = data; 

  const colorMap = {
    red: "border-pink-500",
    blue: "border-blue-500",
    yellow: "border-amber-400",
    green: "border-emerald-600",
  };

  const activeColorClass = colorMap[themeColor] || "border-gray-300";

  return (
    <div 
      onClick={onClick} 
      // Dibuat lebih responsif (w-full max-w-md) tanpa margin negatif
      className={`p-6 bg-white border-2 ${activeColorClass} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 w-full max-w-md`}
    >
      <div className="flex flex-col gap-3">
        <h3 className={`text-base font-semibold text-slate-800`}>{title}</h3>
        
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {summaryText || "Klik untuk melihat analisis detail..."}
        </p>
        
        <div className="text-xs font-medium text-blue-600 mt-2 flex items-center gap-1">
            Lihat Detail <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;