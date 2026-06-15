// Components/layout/RoadmapSummaryView.jsx

import React from 'react';
import RoadmapCard from '../features/RoadmapCard';

const RoadmapSummaryView = ({ onSelect, roadmapData }) => {
  return (
    <div className="w-full relative">
      {/* Vertical timeline line - visible until sm breakpoint */}
      <div className="sm:hidden absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-900 -translate-x-1/2 -z-10">
        <div className="absolute -top-1 left-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2"></div>
        <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2"></div>
      </div>

      {/* Mobile Layout - Center stack below 640px (no timeline line visible) */}
      <div className="sm:hidden">
        <div className="flex flex-col gap-6 py-6">
          {roadmapData.map((data) => {
            const { id, quarter } = data;

            return (
              <div key={id} className="w-full">
                <div className="flex items-center justify-center mb-4">
                  <div className="px-4 py-2 text-slate-200 bg-slate-600 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sm tracking-wide">{quarter}</h4>
                  </div>
                </div>
                <div className="flex justify-center">
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

      {/* Sm to Xl Layout - Timeline with alternating cards (640px and up) */}
      <div className="hidden sm:block relative">
        <div className="relative flex flex-col items-center gap-16 py-8">
          {/* Vertical timeline line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-900 -translate-x-1/2 -z-10">
            <div className="absolute -top-1 left-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2"></div>
            <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-slate-900 rounded-full -translate-x-1/2"></div>
          </div>

          {roadmapData.map((data, index) => {
            const { id, quarter } = data;
            const isLeft = index % 2 === 0;

            return (
              <div key={id} className="relative w-full flex items-center justify-center">
                {/* Quarter label */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center px-6 py-3 text-slate-200 bg-slate-600 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-sm tracking-wide">{quarter}</h4>
                </div>

                {/* Alternating card layout - left-right */}
                <div className={`flex w-full ${isLeft ? 'justify-end pr-[calc(55%+2rem)]' : 'justify-start pl-[calc(55%+2rem)]'}`}>
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
    </div>
  );
};

export default RoadmapSummaryView;
