import React from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { WorldIcon } from './icons/WorldIcon';

const Step: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10">
    <div className="flex-shrink-0 w-16 h-16 mb-4 flex items-center justify-center bg-slate-700 rounded-full text-cyan-400">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">三步，重构您的记忆</h2>
          <p className="mt-4 text-lg text-slate-400">流程简单直观，让任何人都能成为自己世界的造物主。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step 
            icon={<UploadIcon className="w-8 h-8" />}
            title="1. 上传照片"
            description="选择一张承载您回忆的家乡照片，无论是街景、建筑还是自然风光。"
          />
          <Step 
            icon={<MagicWandIcon className="w-8 h-8" />}
            title="2. AI 魔法生成"
            description="我们的AI将分析图像的结构、纹理和氛围，智能地构建一个完整的3D场景。"
          />
          <Step 
            icon={<WorldIcon className="w-8 h-8" />}
            title="3. 探索你的世界"
            description="进入为您量身定制的3D世界，自由漫步，从全新的角度重温那些珍贵的瞬间。"
          />
        </div>
      </div>
    </section>
  );
};
