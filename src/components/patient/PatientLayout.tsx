'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface PatientLayoutProps {
  children: React.ReactNode;
}

const PatientLayout: React.FC<PatientLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-blue-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              北海道消化器科病院 待ち時間提供サービス
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                閲覧専用ページ
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <footer className="bg-white shadow-sm mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-blue-600">
            © 2025 北海道消化器科病院 - 検査待ち時間共有アプリ
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PatientLayout; 