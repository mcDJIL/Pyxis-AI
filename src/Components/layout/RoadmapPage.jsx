// Components/layout/RoadmapPage.jsx

import React, { useState } from 'react';
import RoadmapSummaryView from './RoadmapSummaryView';
import RoadmapDetailedViewContainer from './RoadmapDetailedViewContainer';
import { ArrowLeft, LayoutDashboard, Map } from 'lucide-react'; // Menggunakan ikon agar tombol back lebih elegan

const RoadmapPage = ({ content }) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState(null); 

  const handlePhaseSelect = (id) => {
    setSelectedPhaseId(id);
  };

  const handleBackToSummary = () => {
    setSelectedPhaseId(null);
  };

  console.log('Roadmap Content:', content);

  return (
    // 1. HAPUS p-8 dan background. Cukup gunakan w-full dan mt-4 (margin-top)
    // agar ada jarak sedikit dari Strategic Matrix di atasnya.
    <div className="relative w-full mt-4 sm:mt-2 px-4 sm:px-2">

       {/* --- HEADER AREA YANG DIPERBAIKI --- */}
        {/* Hapus gap-4, gunakan relative agar menjadi jangkar untuk tombol absolute */}
        <div className="relative flex items-center mb-6 sm:mb-4 min-h-[40px]">

            {/* Tombol kembali diposisikan ABSOLUTE (left-0) agar tidak memakan ruang sama sekali */}
            <div className={`absolute left-0 transition-all duration-500 ease-in-out ${selectedPhaseId ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 -z-10 pointer-events-none'}`}>
                <button
                    onClick={handleBackToSummary}
                    className="cursor-pointer p-2 sm:p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors duration-300 shadow-sm flex items-center justify-center"
                    title="Kembali ke Ringkasan"
                >
                    <ArrowLeft size={18} className="sm:w-4 sm:h-4" />
                </button>
            </div>

            {/* Judul sekarang bebas dari dorongan gap dan menempel sempurna di kiri */}
            {/* Saat kartu diklik, judul akan memudar dan bergeser sedikit ke kanan untuk memberi tempat pada tombol Back */}
            <div className="flex items-center gap-3 sm:gap-2">
                <Map size={24} className="text-[#0059BB] sm:w-5 sm:h-5" />
                <h2 className={`text-lg sm:text-xl font-bold text-gray-900 transition-all duration-500 ease-in-out ${selectedPhaseId ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                    Project Roadmap
                </h2>
            </div>
        </div>
        
        {/* Area Konten Roadmap */}
        {/* Diberi min-h-[600px] agar layout absolut di dalamnya tidak membuat tinggi halaman menjadi 0 */}
        <div className="relative w-full min-h-[1150px] min-[400px]:min-h-[1000px] md:min-h-[800px]">
            {/* Tampilan Ringkasan Awal */}
            <div className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${selectedPhaseId ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                <RoadmapSummaryView 
                 onSelect={handlePhaseSelect} 
                    roadmapData={content} 
                />
            </div>

            {/* Tampilan Detail Fase */}
            <div className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${selectedPhaseId ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
                {/* Pastikan komponen hanya dirender saat ada ID untuk menghindari error pencarian data */}
                {selectedPhaseId && (
                   <RoadmapDetailedViewContainer 
                    selectedId={selectedPhaseId} 
                    onSelect={handlePhaseSelect} 
                    roadmapData={content} 
                   />
                )}
            </div>

        </div>
    </div>
  );
};

export default RoadmapPage;
