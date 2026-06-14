// Components/features/RoadmapCard.jsx

import React from 'react';

// Prop 'position' dihapus karena penempatan kiri/kanan diatur oleh komponen induk
const RoadmapCard = ({ data, onClick }) => {
  const { summaryTitle, themeColor, summaryText } = data;

  const colorMap = {
    red: "border-pink-500",
    blue: "border-blue-500",
    yellow: "border-amber-400",
    green: "border-emerald-600",
  };

  const activeColorClass = colorMap[themeColor] || "border-gray-300";
  const displayText = typeof summaryText === 'string' ? summaryText : typeof summaryText === 'object' && summaryText?.description ? summaryText.description : String(summaryText || "Klik untuk melihat analisis detail...");

  return (
    <div
      onClick={onClick}
      // Dibuat lebih responsif (w-full max-w-md) tanpa margin negatif
      className={`p-6 sm:p-4 bg-white border-2 ${activeColorClass} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 w-full max-w-md sm:max-w-none`}
    >
      <div className="flex flex-col gap-3 sm:gap-2">
        <h3 className={`text-base sm:text-sm font-semibold text-slate-800`}>{summaryTitle}</h3>

        <p className="text-sm sm:text-xs text-slate-600 leading-relaxed line-clamp-3">
          {displayText}
        </p>

        <div className="text-xs sm:text-[10px] font-medium text-blue-600 mt-2 sm:mt-1 flex items-center gap-1">
            <span className="sm:hidden">Lihat Detail</span>
            <span className="hidden sm:inline">Detail</span> <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
