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

  const analysis = useAnalysisStore(
        state => state.getAnalysisById(id)
    )

    if (!analysis) {
        return (
            <div className="p-10">
                No analysis found
            </div>
        )
    } else {
        console.log(analysis)
    }

  return (
    // Wrapper utama untuk keseluruhan halaman dashboard
    <div className="p-8 bg-gray-50 min-h-screen dashboard-content">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">

        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800">
            {analysis.analysis.analysis.businessConcept.businessName}
          </h1>
          <p className="text-gray-600 mt-1">
            {analysis.analysis.analysis.summary.title}</p>
        </div>
        
        {/* 1. Memanggil Komponen Executive Summary */}
        <ExecutiveSummary 
          title="Executive Summary"
          icon={<FileText size={22} />}
          content={analysis.analysis.analysis.summary.content}
        />

        {/* 2. Memanggil Komponen Strategic Matrix */}
        <StrategicMatrix
          content={analysis.analysis.analysis.swot}
        />

        {/* 3. Memanggil Komponen Roadmap Vertikal */}
        <VerticalRoadmapContainer
          content={analysis.analysis.analysis.roadmap}
        />

        <ProspectCard
          prospect={analysis.analysis.analysis.prospect}
          businessName={analysis.analysis.analysis.businessConcept.businessName}
        />

      </div>
    </div>
  );
};

export default DashboardPage;
