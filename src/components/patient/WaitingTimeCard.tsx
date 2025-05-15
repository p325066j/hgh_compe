import React from 'react';
import Link from 'next/link';
import { WaitingTimeWithExamination } from '@/types';
import StatusBadge from '@/components/ui/StatusBadge';

interface WaitingTimeCardProps {
  waitingTime: WaitingTimeWithExamination;
}

const WaitingTimeCard: React.FC<WaitingTimeCardProps> = ({ waitingTime }) => {
  const { examination, waitingCount, estimatedMinutes, status } = waitingTime;
  
  // 最終更新時刻をフォーマット
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-blue-100 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <Link href={`/patient/${examination.id}`} className="text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          {examination.name}
        </Link>
        <StatusBadge status={status} />
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{examination.description}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center bg-blue-50 p-3 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700">待ち人数</p>
          <p className="text-2xl font-bold text-blue-600">
            {status === 'closed' ? '-' : `${waitingCount}人`}
          </p>
        </div>
        
        <div className="text-center bg-green-50 p-3 rounded-lg border border-green-100">
          <p className="text-sm text-green-700">推定待ち時間</p>
          <p className="text-2xl font-bold text-green-600">
            {status === 'closed' ? '-' : `約${estimatedMinutes}分`}
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-right text-xs text-gray-500">
        最終更新: {formatLastUpdated(waitingTime.updatedAt)}
      </div>
      
      <div className="mt-3 text-right">
        <Link 
          href={`/patient/${examination.id}`}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          詳細を見る
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default WaitingTimeCard; 