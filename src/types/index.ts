// 検査種類の型定義
export interface Examination {
  id: string;
  name: string;
  description: string;
  averageTime: number; // 平均所要時間（分）
  createdAt: string;
  updatedAt: string;
}

// 待ち時間情報の型定義
export interface WaitingTime {
  id: string;
  examinationId: string;
  waitingCount: number; // 待ち人数
  estimatedMinutes: number; // 推定待ち時間（分）
  status: 'normal' | 'crowded' | 'closed'; // ステータス（通常/混雑/休止）
  lastUpdatedBy: string;
  createdAt: string;
  updatedAt: string;
}

// スタッフユーザーの型定義
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff'; // 役割（管理者/一般スタッフ）
  createdAt: string;
  updatedAt: string;
}

// 待ち時間と検査情報を結合した表示用の型
export interface WaitingTimeWithExamination {
  id: string;
  examination: Examination;
  waitingCount: number;
  estimatedMinutes: number;
  status: 'normal' | 'crowded' | 'closed';
  updatedAt: string;
}

// 診察室の型定義
export interface ConsultationRoom {
  id: string;
  roomNumber: string;
  department: '内科' | '外科'; // 診療科
  doctorName: string;
  createdAt: string;
  updatedAt: string;
}

// 診察待ち時間情報の型定義
export interface ConsultationWaitingTime {
  id: string;
  roomId: string;
  waitingCount: number; // 待ち人数
  estimatedMinutes: number; // 推定待ち時間（分）
  status: 'normal' | 'crowded' | 'closed'; // ステータス（通常/混雑/休止）
  lastUpdatedBy: string;
  createdAt: string;
  updatedAt: string;
}

// 診察待ち時間と診察室情報を結合した表示用の型
export interface ConsultationWaitingTimeWithRoom {
  id: string;
  room: ConsultationRoom;
  waitingCount: number;
  estimatedMinutes: number;
  status: 'normal' | 'crowded' | 'closed';
  updatedAt: string;
} 