import React from 'react';

const features = [
  {
    name: '照片级真实感',
    description: '通过先进的渲染技术，我们生成的3D世界拥有惊人的细节和光影效果，无限接近现实。',
  },
  {
    name: '动态环境模拟',
    description: 'AI能够智能推断并添加动态元素，如天气变化、日夜交替、流动的水面和摇曳的树木。',
  },
  {
    name: '可交互元素',
    description: '您的世界并非一成不变。我们正在开发与场景中物体进行简单交互的功能，增加沉浸感。',
  },
  {
    name: '一键分享',
    description: '轻松生成您3D世界的链接或视频片段，与家人和朋友分享这份独特的数字记忆。',
  },
  {
    name: '多照片融合',
    description: '未来将支持上传多张来自同一区域的照片，AI会将其智能拼接，构建一个更宏大、更完整的世界。',
  },
  {
    name: '风格化滤镜',
    description: '不仅限于写实，您还可以选择赛博朋克、水墨画或动漫等多种艺术风格来渲染您的世界。',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="bg-slate-900 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">超越想象的特性</h2>
          <p className="mt-4 text-lg text-slate-400">我们不仅仅是复刻，更是对记忆的艺术再创作。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold text-cyan-400">{feature.name}</h3>
              <p className="mt-2 text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
