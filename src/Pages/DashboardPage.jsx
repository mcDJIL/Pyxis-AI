import React from 'react';
import ExecutiveSummary from '@/components/features/ExecutiveSummary';
import StrategicMatrix from '@/components/features/StrategicMatrix';
import VerticalRoadmapContainer from '@/Components/layout/RoadmapPage';
import { useAnalysisStore } from '@/Store/AnalysisStore'

// Asumsi menggunakan Lucide React untuk ikon
import { FileText } from 'lucide-react'; 
import ProspectCard from '@/Components/features/ProspectCard';
import { useParams } from 'react-router-dom';

const DashboardPage = () => {
  const { id } = useParams();

  console.log(id);

  const analysisItem = useAnalysisStore(
        state => state.getAnalysisById(id)
    )

  const analysis = analysisItem?.analysis

  if (!analysis) {
    return (
      <div className="p-10">
        No analysis found
      </div>
    )
  }

  const businessName = analysis?.businessConcept?.businessName || 'Business Analysis'
  const summaryTitle = analysis?.summary?.title || 'Analysis Summary'
  const summaryContent = analysis?.summary?.content
  const swotData = analysis?.swot
  const roadmapData = analysis?.roadmap
  const prospectData = analysis?.prospect

  return (
    // Wrapper utama untuk keseluruhan halaman dashboard
    <div className="p-8 bg-gray-50 min-h-screen dashboard-content">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">

        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800">
            {businessName}
          </h1>
          <p className="text-gray-600 mt-1">
            {summaryTitle}</p>
        </div>

        {/* 1. Memanggil Komponen Executive Summary */}
        {summaryContent && (
          <ExecutiveSummary
            title="Executive Summary"
            icon={<FileText size={22} />}
            content={summaryContent}
          />
        )}

        {/* 2. Memanggil Komponen Strategic Matrix */}
        {swotData && (
          <StrategicMatrix
            content={swotData}
          />
        )}

        {/* 3. Memanggil Komponen Roadmap Vertikal */}
        {roadmapData && (
          <VerticalRoadmapContainer
            content={roadmapData}
          />
        )}

        {prospectData && (
          <ProspectCard
            prospect={prospectData}
            businessName={businessName}
          />
        )}

      </div>
    </div>
  );
};

export default DashboardPage;
