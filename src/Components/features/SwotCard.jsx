import React from 'react';

// Komponen fungsional yang menerima props hasil rancangan kita
const SwotCard = ({ title, icon, items, themeColor }) => {
  
  // Objek untuk memetakan warna tema ke class Tailwind spesifik
  // Ini membantu menghindari class CSS yang berantakan di dalam elemen
  const colorMap = {
    green: "text-emerald-600 bg-emerald-50", // Untuk Strengths
    gray: "text-slate-600 bg-slate-50",      // Untuk Weaknesses
    blue: "text-blue-600 bg-blue-50",        // Untuk Opportunities
    red: "text-red-600 bg-red-50"            // Untuk Threats
  };

  const activeColor = colorMap[themeColor] || colorMap.gray;

  return (
    <div className="flex flex-col p-5 bg-white border border-gray-100 rounded-xl shadow-sm h-full">
      
      {/* Bagian Header: Ikon dan Judul */}
      <div className="flex items-center gap-3 mb-4">
        {/* Wrapper ikon dengan warna dinamis */}
        <div className={`p-2 rounded-md ${activeColor}`}>
          {icon}
        </div>
        <h3 className={`font-semibold text-lg ${activeColor.split(' ')[0]}`}>
          {title}
        </h3>
      </div>

      {/* Bagian List: Mapping array items menjadi elemen list */}
      <ul className="flex flex-col gap-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
            {/* Custom bullet point agar warnanya senada dengan tema */}
            <span className={`mt-1.5 text-[10px] ${activeColor.split(' ')[0]}`}>
              {/* Logika sederhana: jika Strengths pakai check, lainnya pakai dash/bullet */}
              {themeColor === 'green' ? '✔' : themeColor === 'red' ? '!' : '—'}
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default SwotCard;