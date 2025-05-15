import React, { useState } from 'react';
import { WaitingTimeWithExamination } from '@/types';
import StatusBadge from '@/components/ui/StatusBadge';

interface WaitingTimeEditCardProps {
  waitingTime: WaitingTimeWithExamination;
  onUpdate: (id: string, updates: Partial<WaitingTimeWithExamination>) => void;
}

const WaitingTimeEditCard: React.FC<WaitingTimeEditCardProps> = ({ waitingTime, onUpdate }) => {
  const { id, examination, waitingCount, estimatedMinutes, status } = waitingTime;
  
  // 編集モードの状態
  const [isEditing, setIsEditing] = useState(false);
  
  // フォーム入力値の状態
  const [formValues, setFormValues] = useState({
    waitingCount,
    estimatedMinutes,
    status,
  });
  
  // 入力値の変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'waitingCount' || name === 'estimatedMinutes' 
        ? parseInt(value, 10) || 0 
        : value,
    });
  };
  
  // 更新をキャンセル
  const handleCancel = () => {
    setFormValues({
      waitingCount,
      estimatedMinutes,
      status,
    });
    setIsEditing(false);
  };
  
  // 更新を保存
  const handleSave = () => {
    onUpdate(id, formValues);
    setIsEditing(false);
  };
  
  // 最終更新時刻をフォーマット
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{examination.name}</h3>
        <div className="flex items-center">
          <StatusBadge status={status} />
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
          >
            {isEditing ? 'キャンセル' : '編集'}
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{examination.description}</p>
      
      {isEditing ? (
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mb-3 transition-colors">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label htmlFor={`waitingCount-${id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                待ち人数
              </label>
              <input
                type="number"
                id={`waitingCount-${id}`}
                name="waitingCount"
                value={formValues.waitingCount}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor={`estimatedMinutes-${id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                推定待ち時間（分）
              </label>
              <input
                type="number"
                id={`estimatedMinutes-${id}`}
                name="estimatedMinutes"
                value={formValues.estimatedMinutes}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor={`status-${id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ステータス
            </label>
            <select
              id={`status-${id}`}
              name="status"
              value={formValues.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="normal">通常</option>
              <option value="crowded">混雑中</option>
              <option value="closed">休止中</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md mr-2 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-blue-50 dark:bg-blue-900/30 p-2 rounded transition-colors">
            <p className="text-sm text-gray-600 dark:text-gray-400">待ち人数</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {status === 'closed' ? '-' : `${waitingCount}人`}
            </p>
          </div>
          
          <div className="text-center bg-blue-50 dark:bg-blue-900/30 p-2 rounded transition-colors">
            <p className="text-sm text-gray-600 dark:text-gray-400">推定待ち時間</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {status === 'closed' ? '-' : `約${estimatedMinutes}分`}
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-3 text-right text-xs text-gray-500 dark:text-gray-400">
        最終更新: {formatLastUpdated(waitingTime.updatedAt)}
      </div>
    </div>
  );
};

export default WaitingTimeEditCard; 