import React from 'react';

const ExecutiveSummary = ({ title, icon, content }) => {
  return (
    // Menggunakan base styling yang konsisten dengan SwotCard (rounded-xl, border, shadow-sm)
    <div className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white border border-gray-100 rounded-xl shadow-sm">

      {/* Bagian Header: Ikon dan Judul */}
      <div className="flex items-center gap-3 mb-4">
        {/* Ikon dengan warna teal/hijau kebiruan sesuai desain UI */}
        <div className="text-[#0059BB]">
          {icon}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

      {/* Bagian Konten: Render paragraf secara dinamis */}
      <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
        {content.map((paragraph, index) => {
          const paragraphText = typeof paragraph === 'string' ? paragraph : typeof paragraph === 'object' && paragraph?.description ? paragraph.description : String(paragraph)
          return <p key={index}>{paragraphText}</p>
        })}
      </div>
      
    </div>
  );
};

export default ExecutiveSummary;
