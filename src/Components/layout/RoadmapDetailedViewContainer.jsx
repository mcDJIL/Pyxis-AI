// src/components/roadmap/RoadmapDetailedViewContainer.jsx

import React from 'react';
import DetailedRoadmapView from '../features/DetailedRoadmapCard';
import RoadmapTimelineContainer from '../features/RoadmapTimelineContainer';

const RoadmapDetailedViewContainer = ({ selectedId, onSelect, roadmapData }) => {
  
  // 1. Cari data spesifik kuartal yang sedang aktif berdasarkan ID yang dipilih
  const currentPhaseData = roadmapData.find((phase) => phase.id === selectedId);

  console.log('Selected ID:', selectedId);
  console.log('Current Phase Data:', currentPhaseData);

  // Safety guard: Jika ID tidak valid atau data tidak ditemukan, jangan render apa pun
  if (!currentPhaseData) {
    return (
      <div className="text-center text-gray-500 py-10">
        Data kuartal tidak ditemukan.
      </div>
    );
  }

  return (
    /* Menggunakan flexbox yang responsif:
      - Pada layar kecil (mobile): menumpuk vertikal (flex-col)
      - Pada layar medium ke atas (md:flex-row): berdampingan kiri-kanan
    */
    <div className="flex flex-col md:flex-row gap-8 items-start w-full min-h-[450px]">
      
      {/* SISI KIRI: Kartu Analisis Detail (Mengambil sisa ruang yang tersedia)
        order-2 & md:order-1 memastikan di mobile kartu berada di bawah tombol, 
        tapi di desktop kembali ke posisi kiri.
      */}
      <div className="flex-1 w-full order-2 md:order-1 transition-all duration-500">
        <DetailedRoadmapView data={currentPhaseData} />
      </div>

      {/* SISI KANAN: Sidebar Navigasi Kontrol Kuartal
        Lebarnya otomatis menyesuaikan (w-auto) agar garis menempel rapi di kanan
      */}
      <div className="w-full md:w-auto order-1 md:order-2 flex justify-center md:justify-start">
        <RoadmapTimelineContainer 
          activeId={selectedId} 
          onSelect={onSelect}
          roadmapData={roadmapData}
        />
      </div>

    </div>
  );
};

export default RoadmapDetailedViewContainer;