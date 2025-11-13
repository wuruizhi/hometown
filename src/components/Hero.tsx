import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0ea5e9] to-[#22d3ee] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
          上传一张老照片，重现一个3D故乡
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
          我们借助尖端的生成式AI技术，将您的静态照片转化为一个充满生机、可供探索的沉浸式3D世界。让尘封的记忆，再次鲜活。
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a href="#demo" className="inline-block px-8 py-3 text-base font-semibold bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors duration-200 shadow-lg shadow-cyan-500/30 transform hover:scale-105">
            立即开始体验
          </a>
          <a href="#features" className="inline-block px-8 py-3 text-base font-semibold bg-slate-700/50 text-slate-200 rounded-full hover:bg-slate-700 transition-colors duration-200 transform hover:scale-105">
            了解更多
          </a>
        </div>
      </div>
    </section>
  );
};
