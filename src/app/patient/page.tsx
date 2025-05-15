'use client';

import React, { useEffect, useState } from 'react';
import PatientLayout from '@/components/patient/PatientLayout';
import WaitingTimeCard from '@/components/patient/WaitingTimeCard';
import { getWaitingTimesWithExaminations } from '@/data/mockData';
import { WaitingTimeWithExamination } from '@/types';

export default function PatientPage() {
  const [waitingTimes, setWaitingTimes] = useState<WaitingTimeWithExamination[]>([]);
  const [filteredWaitingTimes, setFilteredWaitingTimes] = useState<WaitingTimeWithExamination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // データを取得する関数
  const fetchData = () => {
    setIsLoading(true);
    // モックデータを取得（実際のアプリではAPIリクエストになる）
    const data = getWaitingTimesWithExaminations();
    setWaitingTimes(data);
    setFilteredWaitingTimes(data);
    setIsLoading(false);
    
    // 最終更新時刻を設定
    const now = new Date();
    setLastUpdated(
      `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    );
  };

  // フィルタリング関数
  const filterWaitingTimes = () => {
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
  };

  // フィルター変更時の処理
  useEffect(() => {
    filterWaitingTimes();
  }, [statusFilter, searchTerm, waitingTimes]);

  // 初回レンダリング時にデータを取得
  useEffect(() => {
    fetchData();
    
    // 60秒ごとにデータを自動更新（リアルタイム更新のシミュレーション）
    const intervalId = setInterval(fetchData, 60000);
    
    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, []);

  // 手動更新時の処理
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <PatientLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-2xl font-bold text-white-600 mb-4 md:mb-0 pb-2 border-b-2 border-blue-200">北海道消化器科病院 検査待ち時間一覧</h2>
        <div className="flex items-center">
          <span className="text-sm text-blue-600 mr-2">最終更新: {lastUpdated}</span>
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