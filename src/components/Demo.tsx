import React, { useState, useCallback } from 'react';
import { generateWorldDescription } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
    <span className="text-slate-300 ml-2">AI 正在构想您的世界...</span>
  </div>
);

export const Demo: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setGeneratedDescription('');
      setError('');
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!imageFile) {
      setError('请先选择一张图片。');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedDescription('');

    try {
      const { base64, mimeType } = await fileToBase64(imageFile);
      const description = await generateWorldDescription(base64, mimeType);
      setGeneratedDescription(description);
    } catch (err) {
      setError('生成描述时发生错误，请稍后重试。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <section id="demo" className="py-20 sm:py-28 bg-slate-800/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">立即体验 AI 的创想</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">上传一张您家乡的图片，看看 AI 会如何为您描绘一个可供探索的 3D 世界。</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input and Preview */}
            <div className="flex flex-col gap-4 p-6 bg-slate-800 rounded-lg border border-slate-700">
              <label htmlFor="image-upload" className="block text-lg font-semibold text-white">上传您的照片</label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-cyan-500 px-2">
                      <span>选择文件</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <p className="pl-1">或拖拽到此处</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-300 mb-2">图片预览:</p>
                  <img src={imagePreview} alt="Preview" className="rounded-lg w-full h-auto object-cover" />
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isLoading || !imageFile}
                className="mt-4 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '生成中...' : '生成世界蓝图'}
              </button>
            </div>

            {/* Output */}
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 min-h-[300px] flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-4">AI 的创世蓝图</h3>
              <div className="flex-grow prose prose-sm prose-invert max-w-none text-slate-300">
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-400">{error}</p>}
                {generatedDescription ? (
                  <p className="whitespace-pre-wrap">{generatedDescription}</p>
                ) : (
                  !isLoading && <p className="text-slate-500">AI 生成的关于这个 3D 世界的详细描述将会出现在这里...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
