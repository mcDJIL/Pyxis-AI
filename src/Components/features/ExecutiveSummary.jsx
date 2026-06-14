import React from 'react';

const ExecutiveSummary = ({ title, icon, content }) => {
  return (
    // Menggunakan base styling yang konsisten dengan SwotCard (rounded-xl, border, shadow-sm)
    <div className="p-6 sm:p-4 mb-6 sm:mb-4 bg-white border border-gray-100 rounded-xl shadow-sm">

      {/* Bagian Header: Ikon dan Judul */}
      <div className="flex items-center gap-3 mb-4">
        {/* Ikon dengan warna teal/hijau kebiruan sesuai desain UI */}
        <div className="text-teal-700">
          {icon}
        </div>
        <h2 className="text-xl sm:text-lg font-bold text-gray-900">
          {title}
        </h2>
      </div>

      {/* Bagian Konten: Render paragraf secara dinamis */}
      <div className="flex flex-col gap-4 sm:gap-3 text-sm sm:text-xs text-gray-600 leading-relaxed">
        {content.map((paragraph, index) => {
          const paragraphText = typeof paragraph === 'string' ? paragraph : typeof paragraph === 'object' && paragraph?.description ? paragraph.description : String(paragraph)
          return <p key={index}>{paragraphText}</p>
        })}
      </div>
      
    </div>
  );
};

export default ExecutiveSummary;
