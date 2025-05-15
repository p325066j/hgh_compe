import React from 'react';
import { ConsultationWaitingTimeWithRoom } from '@/types';
import StatusBadge from '@/components/ui/StatusBadge';

interface ConsultationWaitingTimeCardProps {
  waitingTime: ConsultationWaitingTimeWithRoom;
}

const ConsultationWaitingTimeCard: React.FC<ConsultationWaitingTimeCardProps> = ({ waitingTime }) => {
  const { room, waitingCount, estimatedMinutes, status } = waitingTime;
  
  // 最終更新時刻をフォーマット
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // 診療科に応じた色を設定
  const getDepartmentColor = (department: '内科' | '外科') => {
    return department === '内科' 
      ? 'bg-blue-500 text-white' 
      : 'bg-green-500 text-white';
  };

  const getBgGradient = (department: '内科' | '外科') => {
    return department === '内科'
      ? 'from-blue-50 to-white'
      : 'from-green-50 to-white';
  };

  const getBorderColor = (department: '内科' | '外科') => {
    return department === '内科' ? 'border-blue-200' : 'border-green-200';
  };

  return (
    <div className={`bg-gradient-to-br ${getBgGradient(room.department)} rounded-lg shadow-md p-5 mb-4 border ${getBorderColor(room.department)} hover:shadow-lg transition-all duration-200`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center">
            <span className={`text-sm font-medium px-3 py-1 rounded-full mr-2 ${getDepartmentColor(room.department)}`}>
              {room.department}
            </span>
            <h3 className="text-lg font-semibold text-gray-800">
              診察室{room.roomNumber}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">担当: {room.doctorName} 先生</p>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center bg-white p-3 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600">待ち人数</p>
          <p className="text-2xl font-bold text-gray-800">
            {status === 'closed' ? '-' : `${waitingCount}人`}
          </p>
        </div>
        
        <div className="text-center bg-white p-3 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600">推定待ち時間</p>
          <p className="text-2xl font-bold text-gray-800">
            {status === 'closed' ? '-' : `約${estimatedMinutes}分`}
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-right text-xs text-gray-500">
        最終更新: {formatLastUpdated(waitingTime.updatedAt)}
      </div>
    </div>
  );
};

export default ConsultationWaitingTimeCard; 