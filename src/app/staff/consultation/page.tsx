'use client';

import React, { useEffect, useState } from 'react';
import StaffLayout from '@/components/staff/StaffLayout';
import ConsultationWaitingTimeEditCard from '@/components/staff/ConsultationWaitingTimeEditCard';
import { useWaitingTime } from '@/context/WaitingTimeContext';
import { ConsultationWaitingTimeWithRoom } from '@/types';

export default function ConsultationWaitingTimePage() {
  const { 
    consultationWaitingTimes: waitingTimes, 
    updateConsultationWaitingTime, 
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

  // 待ち時間情報を更新する関数
  const handleUpdateWaitingTime = (id: string, updates: Partial<ConsultationWaitingTimeWithRoom>) => {
    // コンテキスト経由で更新（患者側にも反映される）
    updateConsultationWaitingTime(id, updates);
    
    // 成功メッセージ（実際のアプリではトースト通知など）
    alert('診察待ち時間情報を更新しました');
  };

  // データ更新処理
  const handleRefresh = () => {
    setIsLoading(true);
    refreshConsultationWaitingTimes();
    setIsLoading(false);
  };

  return (
    <StaffLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 md:mb-0">診察待ち時間管理</h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">最終更新: {consultationTimesLastUpdated}</span>
          <button 
            onClick={handleRefresh}
            className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? '更新中...' : 'データ更新'}
          </button>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              スタッフ専用ページです。診察待ち時間情報の更新は患者向けページにリアルタイムで反映されます。
            </p>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">データを読み込み中...</p>
        </div>
      ) : waitingTimes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400">診察室情報がありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {waitingTimes.map((waitingTime) => (
            <ConsultationWaitingTimeEditCard 
              key={waitingTime.id} 
              waitingTime={waitingTime}
              onUpdate={handleUpdateWaitingTime}
            />
          ))}
        </div>
      )}
    </StaffLayout>
  );
} 