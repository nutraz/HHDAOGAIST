import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  color: 'energy' | 'eco' | 'tech';
  trend?: 'up' | 'down';
  trendValue?: string;
  progress?: number;
}

const colorMap = {
  energy: {
    text: 'text-energy-400',
    bg: 'bg-energy-500',
    border: 'group-hover:border-energy-500/60',
    glow: 'from-energy-500/20 to-energy-600/20',
    bar: 'from-energy-500 to-energy-400',
  },
  eco: {
    text: 'text-eco-400',
    bg: 'bg-eco-500',
    border: 'group-hover:border-eco-500/60',
    glow: 'from-eco-500/20 to-eco-600/20',
    bar: 'from-eco-500 to-eco-400',
  },
  tech: {
    text: 'text-tech-400',
    bg: 'bg-tech-600',
    border: 'group-hover:border-tech-600/60',
    glow: 'from-tech-600/20 to-tech-700/20',
    bar: 'from-tech-600 to-tech-400',
  },
};

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon: Icon, color, trend, trendValue, progress }) => {
  const styles = colorMap[color];

  return (
    <div className={`relative group overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-6 transition-all duration-300 hover:shadow-lg ${styles.border}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gray-800/50 ${styles.text}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${styles.text}`}>{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        </div>

        {progress !== undefined && (
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden mb-3">
            <div 
              className={`bg-gradient-to-r ${styles.bar} h-full rounded-full transition-all duration-1000`} 
              style={{width: `${progress}%`}}
            ></div>
          </div>
        )}

        {(subValue || trendValue) && (
          <div className="flex justify-between items-center text-sm">
            {subValue && <span className="text-gray-400">{subValue}</span>}
            {trendValue && (
              <span className={trend === 'down' ? 'text-red-400' : 'text-green-400'}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;