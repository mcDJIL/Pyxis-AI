import React from 'react';
import SwotCard from './SwotCard';
import { swotData } from '@/Constants/swotData';
import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle } from 'lucide-react';

const StrategicMatrix = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Strategic Matrix</h2>
      
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