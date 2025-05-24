import React from 'react';

type StatusType = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  text?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  text 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-warning-500/10',
          text: 'text-warning-500',
          label: text || 'Em análise'
        };
      case 'approved':
        return {
          bg: 'bg-success-500/10',
          text: 'text-success-500',
          label: text || 'Aprovado'
        };
      case 'rejected':
        return {
          bg: 'bg-danger-500/10',
          text: 'text-danger-500',
          label: text || 'Reprovado'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-500',
          label: text || status
        };
    }
  };

  const { bg, text: textColor, label } = getStatusConfig();

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bg} ${textColor}`}>
      {label}
    </span>
  );
};

export default StatusBadge;