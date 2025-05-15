'use client';

import React, { useEffect, useState, useCallback } from 'react';
import StaffLayout from '@/components/staff/StaffLayout';
import WaitingTimeEditCard from '@/components/staff/WaitingTimeEditCard';
import { getWaitingTimesWithExaminations } from '@/data/mockData';
import { WaitingTimeWithExamination } from '@/types';

export default function StaffPage() {
  const [waitingTimes, setWaitingTimes] = useState<WaitingTimeWithExamination[]>([]);
  const [filteredWaitingTimes, setFilteredWaitingTimes] = useState<WaitingTimeWithExamination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [statusFilter] = useState<string>('all');
  const [searchTerm] = useState<string>('');

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

  // 待ち時間情報を更新する関数
  const handleUpdateWaitingTime = (id: string, updates: Partial<WaitingTimeWithExamination>) => {
    // 実際のアプリではAPIリクエストでデータを更新
    // モックデータの場合はフロントエンドの状態のみ更新
    setWaitingTimes(prevTimes => 
      prevTimes.map(time => 
        time.id === id 
          ? { ...time, ...updates, updatedAt: new Date().toISOString() } 
          : time
      )
    );
    
    // 最終更新時刻を更新
    const now = new Date();
    setLastUpdated(
      `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    );
    
    // 成功メッセージ（実際のアプリではトースト通知など）
    alert('待ち時間情報を更新しました');
  };

  // 初回レンダリング時にデータを取得
  useEffect(() => {
    fetchData();
    
    // 60秒ごとにデータを自動更新（リアルタイム更新のシミュレーション）
    const intervalId = setInterval(fetchData, 60000);
    
    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StaffLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 md:mb-0">検査待ち時間管理</h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">最終更新: {lastUpdated}</span>
          <button 
            onClick={fetchData}
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
              スタッフ専用ページです。待ち時間情報の更新は患者向けページにリアルタイムで反映されます。
            </p>
          </div>
        </div>
      </div>
      
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">データを読み込み中...</p>
        </div>
      ) : filteredWaitingTimes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400">
            {waitingTimes.length === 0 
              ? '検査情報がありません' 
              : '条件に一致する検査はありません'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWaitingTimes.map((waitingTime) => (
            <WaitingTimeEditCard 
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