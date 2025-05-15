'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StaffLayout from '@/components/staff/StaffLayout';
import { examinations as mockExaminations } from '@/data/mockData';
import { Examination } from '@/types';

export default function ExaminationManagementPage() {
  const [examinations, setExaminations] = useState<Examination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  
  // フォーム用の状態
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    description: '',
    averageTime: 0
  });
  
  // データ取得
  useEffect(() => {
    // モックデータを使用（実際はAPIから取得）
    setExaminations(mockExaminations);
    setIsLoading(false);
  }, []);
  
  // フォーム入力変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'averageTime' ? parseInt(value, 10) || 0 : value
    });
  };
  
  // 検査種類追加モードでフォームを表示
  const handleAddNew = () => {
    setFormValues({
      id: `exam-${Date.now()}`, // 実際のアプリではサーバー側でIDを生成
      name: '',
      description: '',
      averageTime: 0
    });
    setFormMode('add');
    setShowForm(true);
  };
  
  // 検査種類編集モードでフォームを表示
  const handleEdit = (examination: Examination) => {
    setFormValues({
      id: examination.id,
      name: examination.name,
      description: examination.description,
      averageTime: examination.averageTime
    });
    setFormMode('edit');
    setShowForm(true);
  };
  
  // 検査種類削除の確認
  const handleDelete = (id: string) => {
    if (window.confirm('この検査種類を削除してもよろしいですか？関連する待ち時間データもすべて削除されます。')) {
      // 実際のアプリではAPIを呼び出して削除
      setExaminations(examinations.filter(exam => exam.id !== id));
      alert('検査種類を削除しました');
    }
  };
  
  // フォーム送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    if (!formValues.name || !formValues.description || formValues.averageTime <= 0) {
      alert('すべての項目を入力してください');
      return;
    }
    
    const now = new Date().toISOString();
    
    if (formMode === 'add') {
      // 新規追加
      const newExamination: Examination = {
        ...formValues,
        createdAt: now,
        updatedAt: now
      };
      
      setExaminations([...examinations, newExamination]);
      alert('検査種類を追加しました');
    } else {
      // 編集
      setExaminations(
        examinations.map(exam => 
          exam.id === formValues.id 
            ? { ...formValues, createdAt: exam.createdAt, updatedAt: now } 
            : exam
        )
      );
      alert('検査種類を更新しました');
    }
    
    // フォームをリセット
    setShowForm(false);
    setFormValues({
      id: '',
      name: '',
      description: '',
      averageTime: 0
    });
  };
  
  return (
    <StaffLayout>
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 md:mb-0">検査種類管理</h2>
        <div className="flex items-center space-x-2">
          <Link 
            href="/staff" 
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            待ち時間管理に戻る
          </Link>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            新規検査を追加
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 transition-colors">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {formMode === 'add' ? '新規検査種類を追加' : '検査種類を編集'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                検査名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                説明 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label htmlFor="averageTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                平均所要時間（分） <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="averageTime"
                name="averageTime"
                value={formValues.averageTime}
                onChange={handleInputChange}
                min="1"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                {formMode === 'add' ? '追加' : '更新'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">データを読み込み中...</p>
        </div>
      ) : examinations.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400">検査種類が登録されていません</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  検査名
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  説明
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  平均所要時間
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {examinations.map((examination) => (
                <tr key={examination.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{examination.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{examination.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{examination.averageTime}分</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(examination)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(examination.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </StaffLayout>
  );
} 