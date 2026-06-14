import React, { useRef } from 'react';
import ExecutiveSummary from '@/components/features/ExecutiveSummary';
import StrategicMatrix from '@/components/features/StrategicMatrix';
import VerticalRoadmapContainer from '@/Components/layout/RoadmapPage';
import { useAnalysisStore } from '@/Store/AnalysisStore'

import { FileText, Download } from 'lucide-react'; 
import ProspectCard from '@/Components/features/ProspectCard';
import { useParams } from 'react-router-dom';
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

const DashboardPage = () => {
  const { id } = useParams();
  const dashboardRef = useRef(null)

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

  const handleExportPDF = async () => {
    try {
      const originalError = console.error
      console.error = () => {}

      const dashboard = dashboardRef.current
      const pageWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const margin = 10
      const maxContentWidth = pageWidth - 2 * margin
      const maxContentHeight = pageHeight - 2 * margin

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      let currentPage = 1
      let currentY = margin

      // Get all sections
      const sections = dashboard.querySelectorAll('section, .mb-12')
      
      for (const section of sections) {
        try {
          const dataUrl = await toPng(section, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
          })

          const img = new Image()
          img.src = dataUrl

          await new Promise((resolve) => {
            img.onload = () => {
              const imgWidth = maxContentWidth
              const imgHeight = (img.height * imgWidth) / img.width
              const spacingAfter = 5 // mm between sections

              // Check if section fits in current page
              if (currentY + imgHeight + spacingAfter > pageHeight - margin) {
                // If not, move to next page
                if (currentY > margin) {
                  pdf.addPage()
                  currentPage++
                  currentY = margin
                }
              }

              // If section is longer than one page, split it
              if (imgHeight > maxContentHeight) {
                let heightLeft = imgHeight
                let positionInImage = 0

                while (heightLeft > 0) {
                  const heightToDraw = Math.min(maxContentHeight, heightLeft)
                  
                  // Create canvas untuk crop
                  const canvas = document.createElement('canvas')
                  canvas.width = img.width
                  canvas.height = (heightToDraw / imgHeight) * img.height

                  const ctx = canvas.getContext('2d')
                  ctx.drawImage(
                    img,
                    0,
                    (positionInImage / imgHeight) * img.height,
                    img.width,
                    (heightToDraw / imgHeight) * img.height,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                  )

                  const croppedUrl = canvas.toDataURL('image/png')
                  pdf.addImage(croppedUrl, 'PNG', margin, currentY, imgWidth, heightToDraw)

                  heightLeft -= heightToDraw
                  positionInImage += heightToDraw
                  currentY = margin

                  if (heightLeft > 0) {
                    pdf.addPage()
                    currentPage++
                  }
                }

                currentY = margin + spacingAfter
              } else {
                // Section fits in current page
                pdf.addImage(dataUrl, 'PNG', margin, currentY, imgWidth, imgHeight)
                currentY += imgHeight + spacingAfter
              }

              resolve()
            }
            img.onerror = resolve
          })
        } catch (error) {
          console.warn('Failed to render section', error)
        }
      }

      console.error = originalError
      pdf.save(`${businessName || 'business'}-analysis.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  return (
    <div>
      {/* Wrapper utama untuk keseluruhan halaman dashboard */}
      <div ref={dashboardRef} className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">

          <div className="mb-5">
            <h1 className="text-3xl font-bold text-gray-800">
              {businessName}
            </h1>
            <p className="text-gray-600 mt-1">
              {summaryTitle}</p>
          </div>

          {/* 1. Memanggil Komponen Executive Summary */}
          {summaryContent && (
            <section>
              <ExecutiveSummary
                title="Executive Summary"
                icon={<FileText size={22} />}
                content={summaryContent}
              />
            </section>
          )}

          {/* 2. Memanggil Komponen Strategic Matrix */}
          {swotData && (
            <section>
              <StrategicMatrix
                content={swotData}
              />
            </section>
          )}

          {/* 3. Memanggil Komponen Roadmap Vertikal */}
          {roadmapData && (
            <section>
              <VerticalRoadmapContainer
                content={roadmapData}
              />
            </section>
          )}

          {prospectData && (
            <section>
              <ProspectCard
                prospect={prospectData}
                businessName={businessName}
              />
            </section>
          )}

          {/* Button Export */}
          <div className="flex justify-end">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Download size={20} />
              Export to PDF
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;