import React from 'react';

type StatusType = 'normal' | 'crowded' | 'closed';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusInfo = (status: StatusType) => {
    switch (status) {
      case 'normal':
        return {
          label: '通常',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
        };
      case 'crowded':
        return {
          label: '混雑中',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
        };
      case 'closed':
        return {
          label: '休止中',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
        };
      default:
        return {
          label: '不明',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
        };
    }
  };

  const { label, bgColor, textColor } = getStatusInfo(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
};

export default StatusBadge; 