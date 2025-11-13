
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Hometown Reborn. 保留所有权利。</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
