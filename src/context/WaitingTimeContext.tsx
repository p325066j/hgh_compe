'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { WaitingTimeWithExamination, ConsultationWaitingTimeWithRoom } from '@/types';
import { getWaitingTimesWithExaminations, getConsultationWaitingTimesWithRooms } from '@/data/mockData';

interface WaitingTimeContextType {
  // 検査待ち時間関連
  waitingTimes: WaitingTimeWithExamination[];
  updateWaitingTime: (id: string, updates: Partial<WaitingTimeWithExamination>) => void;
  refreshWaitingTimes: () => void;
  waitingTimesLastUpdated: string;
  
  // 診察室待ち時間関連
  consultationWaitingTimes: ConsultationWaitingTimeWithRoom[];
  updateConsultationWaitingTime: (id: string, updates: Partial<ConsultationWaitingTimeWithRoom>) => void;
  refreshConsultationWaitingTimes: () => void;
  consultationTimesLastUpdated: string;
}

const WaitingTimeContext = createContext<WaitingTimeContextType | undefined>(undefined);

export const useWaitingTime = () => {
  const context = useContext(WaitingTimeContext);
  if (context === undefined) {
    throw new Error('useWaitingTime must be used within a WaitingTimeProvider');
  }
  return context;
};

interface WaitingTimeProviderProps {
  children: ReactNode;
}

export const WaitingTimeProvider: React.FC<WaitingTimeProviderProps> = ({ children }) => {
  // 検査待ち時間の状態
  const [waitingTimes, setWaitingTimes] = useState<WaitingTimeWithExamination[]>([]);
  const [waitingTimesLastUpdated, setWaitingTimesLastUpdated] = useState<string>('');
  
  // 診察室待ち時間の状態
  const [consultationWaitingTimes, setConsultationWaitingTimes] = useState<ConsultationWaitingTimeWithRoom[]>([]);
  const [consultationTimesLastUpdated, setConsultationTimesLastUpdated] = useState<string>('');

  // 現在時刻のフォーマット
  const formatCurrentTime = useCallback(() => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  }, []);

  // 検査待ち時間データを取得
  const refreshWaitingTimes = useCallback(() => {
    const data = getWaitingTimesWithExaminations();
    setWaitingTimes(data);
    setWaitingTimesLastUpdated(formatCurrentTime());
  }, [formatCurrentTime]);

  // 診察室待ち時間データを取得
  const refreshConsultationWaitingTimes = useCallback(() => {
    const data = getConsultationWaitingTimesWithRooms();
    setConsultationWaitingTimes(data);
    setConsultationTimesLastUpdated(formatCurrentTime());
  }, [formatCurrentTime]);

  // 検査待ち時間情報を更新
  const updateWaitingTime = useCallback((id: string, updates: Partial<WaitingTimeWithExamination>) => {
    setWaitingTimes(prevTimes => 
      prevTimes.map(time => 
        time.id === id 
          ? { ...time, ...updates, updatedAt: new Date().toISOString() } 
          : time
      )
    );
    setWaitingTimesLastUpdated(formatCurrentTime());
  }, [formatCurrentTime]);

  // 診察室待ち時間情報を更新
  const updateConsultationWaitingTime = useCallback((id: string, updates: Partial<ConsultationWaitingTimeWithRoom>) => {
    setConsultationWaitingTimes(prevTimes => 
      prevTimes.map(time => 
        time.id === id 
          ? { ...time, ...updates, updatedAt: new Date().toISOString() } 
          : time
      )
    );
    setConsultationTimesLastUpdated(formatCurrentTime());
  }, [formatCurrentTime]);

  // 初回マウント時にデータを取得
  useEffect(() => {
    refreshWaitingTimes();
    refreshConsultationWaitingTimes();
    
    // 60秒ごとに自動更新
    const intervalId = setInterval(() => {
      refreshWaitingTimes();
      refreshConsultationWaitingTimes();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [refreshWaitingTimes, refreshConsultationWaitingTimes]);

  const value = {
    waitingTimes,
    updateWaitingTime,
    refreshWaitingTimes,
    waitingTimesLastUpdated,
    consultationWaitingTimes,
    updateConsultationWaitingTime,
    refreshConsultationWaitingTimes,
    consultationTimesLastUpdated
  };

  return (
    <WaitingTimeContext.Provider value={value}>
      {children}
    </WaitingTimeContext.Provider>
  );
}; 