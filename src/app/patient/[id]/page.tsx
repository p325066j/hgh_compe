'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PatientLayout from '@/components/patient/PatientLayout';
import StatusBadge from '@/components/ui/StatusBadge';
import { getWaitingTimesWithExaminations } from '@/data/mockData';
import { WaitingTimeWithExamination } from '@/types';

export default function ExaminationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [waitingTimeInfo, setWaitingTimeInfo] = useState<WaitingTimeWithExamination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      try {
        // 全ての待ち時間情報を取得
        const allWaitingTimes = getWaitingTimesWithExaminations();
        
        // IDに一致する待ち時間情報を検索
        const targetWaitingTime = allWaitingTimes.find(wt => wt.examination.id === id);
        
        if (targetWaitingTime) {
          setWaitingTimeInfo(targetWaitingTime);
          setError(null);
        } else {
          setError('指定された検査情報が見つかりませんでした');
        }
      } catch (err) {
        setError('データの取得中にエラーが発生しました');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // 1分ごとに自動更新
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, [id]);
  
  // 最終更新時刻をフォーマット
  const formatLastUpdated = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  
  return (
    <PatientLayout>
      <div className="mb-4">
        <Link href="/patient" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          一覧に戻る
        </Link>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">データを読み込み中...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      ) : waitingTimeInfo && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{waitingTimeInfo.examination.name}</h2>
              <StatusBadge status={waitingTimeInfo.status} />
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">{waitingTimeInfo.examination.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center transition-colors">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">待ち人数</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {waitingTimeInfo.status === 'closed' ? '-' : `${waitingTimeInfo.waitingCount}人`}
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center transition-colors">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">推定待ち時間</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {waitingTimeInfo.status === 'closed' ? '-' : `約${waitingTimeInfo.estimatedMinutes}分`}
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center transition-colors">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">平均所要時間</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {`約${waitingTimeInfo.examination.averageTime}分`}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 transition-colors">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">検査情報</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">検査名</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{waitingTimeInfo.examination.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">現在の状況</span>
                  <StatusBadge status={waitingTimeInfo.status} />
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">平均所要時間</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{waitingTimeInfo.examination.averageTime}分</span>
                </li>
              </ul>
            </div>
            
            <div className="text-right text-xs text-gray-500 dark:text-gray-400">
              最終更新: {formatLastUpdated(waitingTimeInfo.updatedAt)}
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
} 