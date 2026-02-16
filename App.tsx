
import React, { useState } from 'react';
import { AppState } from './types';
import { LAB_QUOTES, VerificationQuote } from './constants';
import { generatePersonalizedBlessing } from './services/gemini';
import VerificationPortal from './components/VerificationPortal';
import Fireworks from './components/Fireworks';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LOBBY);
  const [userName, setUserName] = useState('');
  const [activeQuote, setActiveQuote] = useState<VerificationQuote | null>(null);
  const [blessing, setBlessing] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const startVerification = () => {
    if (!userName.trim()) return;
    const randomIndex = Math.floor(Math.random() * LAB_QUOTES.length);
    setActiveQuote(LAB_QUOTES[randomIndex]);
    setState(AppState.QUIZ);
  };

  const handleVerify = (answer: string) => {
    if (!activeQuote) return;
    const isCorrect = answer.trim() === activeQuote.answer;

    if (isCorrect) {
      setIsError(false);
      revealBlessing();
    } else {
      setIsError(true);
    }
  };

  const revealBlessing = async () => {
    setLoading(true);
    setState(AppState.REVEAL);
    const result = await generatePersonalizedBlessing(userName);
    setBlessing(result);
    setLoading(false);
  };

  const handleRestart = () => {
    setBlessing(null);
    const randomIndex = Math.floor(Math.random() * LAB_QUOTES.length);
    setActiveQuote(LAB_QUOTES[randomIndex]);
    setState(AppState.QUIZ);
  };

  const resetError = () => setIsError(false);

  return (
    <div className="w-full max-w-[420px] flex flex-col items-center">
      <Fireworks active={state === AppState.REVEAL && !loading} />
      
      <AnimatePresence mode="wait">
        {state === AppState.LOBBY && (
          <motion.div 
            key="lobby"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full bg-white rounded-2xl p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center fade-in"
          >
            <h1 className="text-[1.8rem] font-black text-[#1a1a1a] mb-2 tracking-tight">
              2026新春祝福
            </h1>
            <p className="text-[#666666] text-sm mb-12 font-mono tracking-[0.2em] opacity-50">
              LAB_ACCESS_CONTROL
            </p>
            
            <div className="space-y-6">
              <input 
                type="text" 
                placeholder="请输入你的姓名" 
                className="w-full px-4 py-4 rounded-lg bg-transparent border-b-2 border-[#1a1a1a] text-[#1a1a1a] placeholder-gray-300 focus:outline-none focus:border-[#005499] transition-all text-center text-lg font-bold"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startVerification()}
              />
              <button 
                onClick={startVerification}
                className="w-full bg-[#1a1a1a] hover:bg-[#005499] text-white font-bold py-4 rounded-lg transition-all transform active:scale-98 tracking-widest text-sm uppercase shadow-lg"
              >
                开始验证
              </button>
            </div>
            <div className="mt-12 flex justify-center opacity-10">
              <span className="text-3xl">🔬</span>
            </div>
          </motion.div>
        )}

        {state === AppState.QUIZ && activeQuote && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full fade-in"
          >
            <VerificationPortal 
              quote={activeQuote} 
              onVerify={handleVerify}
              isError={isError}
              onResetError={resetError}
            />
          </motion.div>
        )}

        {state === AppState.REVEAL && (
          <motion.div 
            key="reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white rounded-2xl p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center greeting-content fade-in"
          >
            <div id="greeting-content">
              {loading ? (
                <div className="py-12 flex flex-col items-center space-y-6">
                  <div className="greet-icon animate-bounce text-5xl">🧧</div>
                  <h2 className="greet-title text-xl font-bold">正在生成中...</h2>
                  <p className="greet-text text-sm px-4">
                    正在根据实验室大数据分析你的科研运势...
                  </p>
                  <div className="w-8 h-8 border-4 border-gray-100 border-t-[#005499] rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <div className="greet-icon">{blessing?.icon || '🎉'}</div>
                  <h2 className="greet-title">{blessing?.title || '验证通过！'}</h2>
                  <p className="greet-text">{blessing?.content || '祝你新年大吉，科研顺利！'}</p>
                  <button 
                    onClick={handleRestart}
                    className="secondary-btn"
                  >
                    再抽一签
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
