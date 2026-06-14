// Components/layout/RoadmapSummaryView.jsx

import React from 'react';
import RoadmapCard from '@/Components/features/RoadmapCard';

const RoadmapSummaryView = ({ onSelect, roadmapData }) => {
  return (
    // Membuang overflow-hidden agar bayangan (shadow) tidak terpotong
    <div className="relative mt-8 w-full px-4 md:px-0">
        
        {/* Tambahan py-6 memastikan bulatan ujung garis memiliki ruang untuk bernapas */}
        <div className="relative flex flex-col items-center gap-16 py-6">
          
          {/* Garis vertikal utama */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-900 -translate-x-1/2 -z-10">
            
            {/* Bulatan ujung atas */}
            <div className="absolute -top-1 left-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2"></div>
            
            {/* Bulatan ujung bawah */}
            <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2"></div>
          
          </div>

          {roadmapData.map((data) => {
            const { id, quarter, position } = data;
            
            return (
              <div key={id} className="relative w-full flex items-center justify-center">
                
                {/* Label Kuartal Tengah */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center px-6 py-3 text-slate-200 bg-slate-600 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-sm tracking-wide">{quarter}</h4>
                </div>
                
                {/* Sistem grid pintar menggunakan Flexbox + Calc:
                  Jika di kiri: elemen didorong ke kanan (justify-end), tapi diberi padding-right 
                  sebesar 50% layar + jarak 4.5rem dari label tengah.
                */}
                <div className={`flex w-full ${position === 'left' ? 'justify-end md:pr-[calc(50%+4.5rem)]' : 'justify-start md:pl-[calc(50%+4.5rem)]'}`}>
                  <RoadmapCard 
                    data={data} 
                    onClick={() => onSelect(id)} 
                  />
                </div>

              </div>
            );
          })}
        </div>
    </div>
  );
};

export default RoadmapSummaryView;