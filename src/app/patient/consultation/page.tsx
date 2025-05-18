'use client';

import React, { useEffect, useState } from 'react';
import PatientLayout from '@/components/patient/PatientLayout';
import ConsultationWaitingTimeCard from '@/components/patient/ConsultationWaitingTimeCard';
import { useWaitingTime } from '@/context/WaitingTimeContext';

export default function ConsultationWaitingTimePage() {
  const { 
    consultationWaitingTimes: waitingTimes, 
    refreshConsultationWaitingTimes, 
    consultationTimesLastUpdated 
  } = useWaitingTime();
  
  const [isLoading, setIsLoading] = useState(true);

  // コンテキストから取得したデータが変更されたらローディング状態を更新
  useEffect(() => {
    if (waitingTimes.length > 0) {
      setIsLoading(false);
    }
  }, [waitingTimes]);

  // 手動更新時の処理
  const handleRefresh = () => {
    setIsLoading(true);
    refreshConsultationWaitingTimes();
    setIsLoading(false);
  };

  return (
    <PatientLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-2xl font-bold text-white-600 mb-4 md:mb-0 pb-2 border-b-2 border-green-200">診察待ち時間一覧</h2>
        <div className="flex items-center">
          <span className="text-sm text-green-600 mr-2">最終更新: {consultationTimesLastUpdated}</span>
          <button 
            onClick={handleRefresh}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors shadow-sm"
            disabled={isLoading}
          >
            {isLoading ? '更新中...' : '更新する'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">データを読み込み中...</p>
        </div>
      ) : waitingTimes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600">診察情報がありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {waitingTimes.map((waitingTime) => (
            <ConsultationWaitingTimeCard key={waitingTime.id} waitingTime={waitingTime} />
          ))}
        </div>
      )}
    </PatientLayout>
  );
} 