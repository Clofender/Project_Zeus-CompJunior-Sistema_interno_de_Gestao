import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: {
    value: number;
    text: string;
    isPositive?: boolean;
  };
  icon: ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color 
}) => {
  return (
    <div className="card flex justify-between items-start">
      <div>
        <h3 className="text-4xl font-bold mb-1">{value}</h3>
        <p className="text-sm text-gray-500 mb-2">{title}</p>
        {change && (
          <p className="text-xs">
            <span className={change.isPositive !== false ? 'text-success-500' : 'text-danger-500'}>
              {change.isPositive !== false ? '↑' : '↓'} {change.value}
            </span>{' '}
            {change.text}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;