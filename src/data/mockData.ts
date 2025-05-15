import { Examination, WaitingTime, User, WaitingTimeWithExamination, ConsultationRoom, ConsultationWaitingTime, ConsultationWaitingTimeWithRoom } from '@/types';

// 検査種類のモックデータ
export const examinations: Examination[] = [
  {
    id: 'exam-001',
    name: 'X線検査',
    description: '胸部や腹部などのX線撮影',
    averageTime: 15,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'exam-002',
    name: 'CT検査',
    description: '全身のCTスキャン',
    averageTime: 30,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'exam-003',
    name: 'MRI検査',
    description: '脳や脊髄などの精密検査',
    averageTime: 45,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'exam-004',
    name: '超音波検査',
    description: '腹部や心臓の超音波検査',
    averageTime: 20,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'exam-005',
    name: '血液検査',
    description: '一般的な血液検査',
    averageTime: 10,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'exam-006',
    name: '内視鏡検査',
    description: '胃や大腸などの内視鏡による検査',
    averageTime: 40,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

// 待ち時間情報のモックデータ
export const waitingTimes: WaitingTime[] = [
  {
    id: 'wait-001',
    examinationId: 'exam-001',
    waitingCount: 3,
    estimatedMinutes: 15,
    status: 'normal',
    lastUpdatedBy: 'user-001',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T09:30:00Z',
  },
  {
    id: 'wait-002',
    examinationId: 'exam-002',
    waitingCount: 8,
    estimatedMinutes: 60,
    status: 'crowded',
    lastUpdatedBy: 'user-001',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T09:45:00Z',
  },
  {
    id: 'wait-003',
    examinationId: 'exam-003',
    waitingCount: 5,
    estimatedMinutes: 90,
    status: 'crowded',
    lastUpdatedBy: 'user-002',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T10:15:00Z',
  },
  {
    id: 'wait-004',
    examinationId: 'exam-004',
    waitingCount: 2,
    estimatedMinutes: 10,
    status: 'normal',
    lastUpdatedBy: 'user-002',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T10:30:00Z',
  },
  {
    id: 'wait-005',
    examinationId: 'exam-005',
    waitingCount: 0,
    estimatedMinutes: 0,
    status: 'closed',
    lastUpdatedBy: 'user-001',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T11:00:00Z',
  },
  {
    id: 'wait-006',
    examinationId: 'exam-006',
    waitingCount: 4,
    estimatedMinutes: 45,
    status: 'normal',
    lastUpdatedBy: 'user-002',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T10:45:00Z',
  },
];

// スタッフユーザーのモックデータ
export const users: User[] = [
  {
    id: 'user-001',
    email: 'admin@hospital.example.com',
    name: '管理者',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'user-002',
    email: 'staff@hospital.example.com',
    name: 'スタッフ',
    role: 'staff',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

// 診察室のモックデータ
export const consultationRooms: ConsultationRoom[] = [
  {
    id: 'room-001',
    roomNumber: '1',
    department: '外科',
    doctorName: '鈴木一郎',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'room-002',
    roomNumber: '2',
    department: '外科',
    doctorName: '田中幸子',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'room-003',
    roomNumber: '3',
    department: '内科',
    doctorName: '佐藤健太',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'room-004',
    roomNumber: '4',
    department: '内科',
    doctorName: '高橋美香',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'room-005',
    roomNumber: '5',
    department: '内科',
    doctorName: '伊藤洋一',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'room-006',
    roomNumber: '6',
    department: '内科',
    doctorName: '山本和子',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

// 診察待ち時間情報のモックデータ
export const consultationWaitingTimes: ConsultationWaitingTime[] = [
  {
    id: 'consult-001',
    roomId: 'room-001',
    waitingCount: 5,
    estimatedMinutes: 25,
    status: 'crowded',
    lastUpdatedBy: 'user-001',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T09:30:00Z',
  },
  {
    id: 'consult-002',
    roomId: 'room-002',
    waitingCount: 3,
    estimatedMinutes: 15,
    status: 'normal',
    lastUpdatedBy: 'user-001',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T09:45:00Z',
  },
  {
    id: 'consult-003',
    roomId: 'room-003',
    waitingCount: 7,
    estimatedMinutes: 35,
    status: 'crowded',
    lastUpdatedBy: 'user-002',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T10:15:00Z',
  },
  {
    id: 'consult-004',
    roomId: 'room-004',
    waitingCount: 4,
    estimatedMinutes: 20,
    status: 'normal',
    lastUpdatedBy: 'user-002',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T10:30:00Z',
  },
  {
    id: 'consult-005',
    roomId: 'room-005',
    waitingCount: 6,
    estimatedMinutes: 30,
    status: 'crowded',
    lastUpdatedBy: 'user-001',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T11:00:00Z',
  },
  {
    id: 'consult-006',
    roomId: 'room-006',
    waitingCount: 2,
    estimatedMinutes: 10,
    status: 'normal',
    lastUpdatedBy: 'user-002',
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T10:45:00Z',
  },
];

// 待ち時間と検査情報を結合したデータを取得する関数
export const getWaitingTimesWithExaminations = (): WaitingTimeWithExamination[] => {
  return waitingTimes.map(waitingTime => {
    const examination = examinations.find(exam => exam.id === waitingTime.examinationId)!;
    return {
      id: waitingTime.id,
      examination,
      waitingCount: waitingTime.waitingCount,
      estimatedMinutes: waitingTime.estimatedMinutes,
      status: waitingTime.status,
      updatedAt: waitingTime.updatedAt,
    };
  });
};

// 診察待ち時間と診察室情報を結合したデータを取得する関数
export const getConsultationWaitingTimesWithRooms = (): ConsultationWaitingTimeWithRoom[] => {
  return consultationWaitingTimes.map(waitingTime => {
    const room = consultationRooms.find(r => r.id === waitingTime.roomId)!;
    return {
      id: waitingTime.id,
      room,
      waitingCount: waitingTime.waitingCount,
      estimatedMinutes: waitingTime.estimatedMinutes,
      status: waitingTime.status,
      updatedAt: waitingTime.updatedAt,
    };
  });
}; 