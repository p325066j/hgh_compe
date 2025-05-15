'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface StaffLayoutProps {
  children: React.ReactNode;
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-blue-700 dark:bg-blue-900 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
              病院検査待ち時間管理システム
            </Link>
            <div className="flex items-center">
              <div className="flex space-x-4 mr-4">
                <Link href="/staff" className="text-sm hover:text-blue-200 transition-colors">
                  検査待ち時間
                </Link>
                <Link href="/staff/consultation" className="text-sm hover:text-blue-200 transition-colors">
                  診察待ち時間
                </Link>
                <Link href="/staff/examinations" className="text-sm hover:text-blue-200 transition-colors">
                  検査種類管理
                </Link>
              </div>
              <div className="text-sm mr-4 hidden md:block">
                スタッフ専用ページ
              </div>
              <ThemeToggle />
              <button className="ml-4 bg-blue-600 dark:bg-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 北海道消化器科病院 - 検査待ち時間共有アプリ（スタッフ用）
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StaffLayout; 