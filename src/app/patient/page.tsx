'use client';

import React, { useEffect, useState, useCallback } from 'react';
import PatientLayout from '@/components/patient/PatientLayout';
import WaitingTimeCard from '@/components/patient/WaitingTimeCard';
import { useWaitingTime } from '@/context/WaitingTimeContext';
import { WaitingTimeWithExamination } from '@/types';

export default function PatientPage() {
  const { waitingTimes, refreshWaitingTimes, waitingTimesLastUpdated } = useWaitingTime();
  const [filteredWaitingTimes, setFilteredWaitingTimes] = useState<WaitingTimeWithExamination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter] = useState<string>('all');
  const [searchTerm] = useState<string>('');

  // コンテキストから取得したデータが変更されたらローディング状態を更新
  useEffect(() => {
    if (waitingTimes.length > 0) {
      setIsLoading(false);
    }
  }, [waitingTimes]);

  // フィルタリング関数
  const filterWaitingTimes = useCallback(() => {
    let filtered = [...waitingTimes];
    
    // ステータスでフィルタリング
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // 検索語句でフィルタリング
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.examination.name.toLowerCase().includes(term) || 
        item.examination.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredWaitingTimes(filtered);
  }, [statusFilter, searchTerm, waitingTimes]);

  // フィルター変更時の処理
  useEffect(() => {
    filterWaitingTimes();
  }, [filterWaitingTimes]);

  // 手動更新時の処理
  const handleRefresh = () => {
    setIsLoading(true);
    refreshWaitingTimes();
    setIsLoading(false);
  };

  return (
    <PatientLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-2xl font-bold text-white-600 mb-4 md:mb-0 pb-2 border-b-2 border-blue-200">北海道消化器科病院 検査待ち時間一覧</h2>
        <div className="flex items-center">
          <span className="text-sm text-blue-600 mr-2">最終更新: {waitingTimesLastUpdated}</span>
          <button 
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
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
      ) : filteredWaitingTimes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600">
            {waitingTimes.length === 0 
              ? '検査情報がありません' 
              : '条件に一致する検査はありません'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWaitingTimes.map((waitingTime) => (
            <WaitingTimeCard key={waitingTime.id} waitingTime={waitingTime} />
          ))}
        </div>
      )}
    </PatientLayout>
  );
} 