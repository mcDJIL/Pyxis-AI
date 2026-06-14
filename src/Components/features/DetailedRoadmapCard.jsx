// components/DetailedRoadmapView.jsx

import React, { useState, useEffect } from 'react';

const DetailedRoadmapView = ({ data }) => {
  // 1. Ekstrak 'id' juga untuk dijadikan pemicu (trigger) animasi
  const { id, detailedTitle, detailedContent, themeColor } = data;
  
  // 2. State untuk mengontrol visibilitas (opacity & translasi)
  const [isVisible, setIsVisible] = useState(false);

  // 3. Hook ini akan berjalan setiap kali 'id' kuartal yang dipilih berubah
  useEffect(() => {
    // Kembalikan ke posisi awal (menghilang & agak turun ke bawah)
    setIsVisible(false);
    
    // Beri jeda 50 milidetik agar browser sempat membaca state 'hilang' di atas,
    // lalu jalankan animasi memunculkannya kembali.
    const timer = setTimeout(() => setIsVisible(true), 50);
    
    // Bersihkan timer jika komponen keburu dibongkar (best practice)
    return () => clearTimeout(timer);
  }, [id]);

  const colorMap = {
    red: "border-pink-500",
    blue: "border-blue-500",
    yellow: "border-amber-400",
    green: "border-emerald-600",
  };

  const activeColorClass = colorMap[themeColor] || "border-gray-300";

  return (
    <div
        // 4. Kita aplikasikan efek transisinya di sini.
        // Jika isVisible true: Opacity 100% dan diam di tempat (translate-y-0)
        // Jika false: Opacity 0% dan turun sedikit (translate-y-4)
        className={`p-8 sm:p-4 bg-white border-2 ${activeColorClass} rounded-2xl shadow-xl transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex flex-col gap-6 sm:gap-4">

        <h3 className={`text-xl sm:text-lg font-bold ${activeColorClass.split('-')[1]}-600`}>
            {detailedTitle}
        </h3>

        <div className="flex flex-col gap-5 sm:gap-3 text-base sm:text-sm text-gray-800 leading-relaxed">
          {detailedContent.map((point, index) => {
            const pointText = typeof point === 'string' ? point : typeof point === 'object' && point?.description ? point.description : String(point)
            return <p key={index} className="leading-relaxed">{pointText}</p>
          })}
        </div>
        
      </div>
    </div>
  );
};

export default DetailedRoadmapView;
