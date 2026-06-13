import React from 'react';
import ExecutiveSummary from '@/components/features/ExecutiveSummary';
import StrategicMatrix from '@/components/features/StrategicMatrix';

// Asumsi menggunakan Lucide React untuk ikon
import { FileText } from 'lucide-react'; 

const DashboardPage = () => {
  // Data teks untuk Executive Summary
  // Disimpan dalam bentuk array agar komponen tahu cara memisahkan paragrafnya
  const summaryContent = [
    "Project Alpha is positioned to capture a significant share of the mid-market enterprise SaaS segment. Core competencies in AI-driven workflow automation provide a distinct moat. However, short-term liquidity and aggressive competitor pricing present material risks heading into Q3.",
    "The primary growth vector remains organic expansion within the existing user base, augmented by targeted outbound sales campaigns prioritizing high-LTV sectors."
  ];

  return (
    // Wrapper utama untuk keseluruhan halaman dashboard
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        
        {/* 1. Memanggil Komponen Executive Summary */}
        <ExecutiveSummary 
          title="Executive Summary"
          icon={<FileText size={22} />}
          content={summaryContent}
        />

        {/* 2. Memanggil Komponen Strategic Matrix */}
        <StrategicMatrix />

      </div>
    </div>
  );
};

export default DashboardPage;