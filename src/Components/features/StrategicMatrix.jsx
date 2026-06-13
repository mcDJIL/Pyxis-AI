import React from 'react';
import SwotCard from './SwotCard';
import { swotData } from '@/Constants/swotData';
import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle, LayoutDashboard } from 'lucide-react';

const StrategicMatrix = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <LayoutDashboard size={24} className="text-teal-700" />
        <h2 className="text-xl font-bold">
          Strategic Matrix
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {swotData.map((data) => (
          <SwotCard 
            key={data.id}
            title={data.title}
            icon={data.icon}
            themeColor={data.themeColor}
            items={data.items}
          />
        ))}
      </div>
    </div>
  );
};

export default StrategicMatrix;