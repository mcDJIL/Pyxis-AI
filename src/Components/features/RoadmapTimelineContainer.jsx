// Components/features/RoadmapTimelineContainer.jsx

import React from 'react';

const RoadmapTimelineContainer = ({ activeId, onSelect, roadmapData }) => {
  return (
    <div className="relative flex flex-col items-center gap-12 sm:gap-6">

      {/* Garis vertikal di tengah */}
      <div className="absolute top-10 bottom-10 left-1/2 w-0.5 bg-gray-900 -translate-x-1/2 sm:top-8 sm:bottom-8"></div>

      {/* 2. Karena roadmapData adalah Array, kita bisa langsung melakukan mapping */}
      {roadmapData.map((phase) => (
        <button
          key={phase.id}
          className={`cursor-pointer relative z-10 flex items-center justify-center p-2 sm:p-3 text-white rounded-lg min-w-[100px] sm:min-w-[120px] shadow-md transition-all duration-500 ease-in-out hover:scale-105 ${activeId === phase.id ? 'bg-slate-800 ring-4 ring-slate-100' : 'bg-slate-600 hover:bg-slate-700'}`}
          onClick={() => onSelect(phase.id)} // Ubah fase aktif saat diklik
        >
          {/* 3. Gunakan phase.quarter (karena di roadmapData atributnya bernama 'quarter', bukan 'label') */}
          <h4 className="font-semibold text-xs sm:text-sm">{phase.quarter}</h4>
        </button>
      ))}
    </div>
  );
};

export default RoadmapTimelineContainer;
