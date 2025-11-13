import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/geminiService';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const TextChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const aiResponse = await generateChatResponse(input);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-slate-800 rounded-lg border border-slate-700 flex flex-col h-[500px]">
      <div className="flex-grow overflow-y-auto mb-4 pr-2">
        {messages.length === 0 && !isLoading && (
            <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">聊天记录将显示在这里...</p>
            </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-md lg:max-w-2xl px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-cyan-800 text-white' : 'bg-slate-700 text-slate-200'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
         {isLoading && (
          <div className="flex justify-start mb-3">
             <div className="max-w-md lg:max-w-2xl px-4 py-2 rounded-xl bg-slate-700 text-slate-200">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                </div>
            </div>
          </div>
        )}
        {error && (
            <div className="flex justify-start mb-3">
                <div className="max-w-md lg:max-w-2xl px-4 py-2 rounded-xl bg-red-900/50 border border-red-500/50 text-red-300">
                    <p className="font-semibold mb-1">错误</p>
                    <p className="whitespace-pre-wrap text-sm">{error}</p>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex-shrink-0 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在这里输入您的问题..."
          disabled={isLoading}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-200 transition"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          发送
        </button>
      </form>
    </div>
  );
};