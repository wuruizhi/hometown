
import React from 'react';
import { WorldIcon } from './icons/WorldIcon';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <WorldIcon className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold tracking-tight text-white">
              故乡重现 <span className="hidden sm:inline text-slate-400 font-light">Hometown Reborn</span>
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200">
              核心功能
            </a>
            <a href="#demo" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200">
              立即体验
            </a>
            <button className="px-4 py-2 text-sm font-semibold bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors duration-200 shadow-lg shadow-cyan-500/20">
              加入候补
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
