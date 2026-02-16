import React, { useState } from 'react';
import { AppState } from './types';
import { LAB_QUOTES, VerificationQuote } from './constants';
// ⚠️ 修复 1：删除了不稳定的后端 gemini API 导入
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

  // 🔥 修复 2：彻底重写祝福逻辑，改为本地纯静态随机，快准稳！
  const revealBlessing = () => {
    setLoading(true);
    setState(AppState.REVEAL);

    // 模拟 1.5 秒的加载动画，保留高级的过渡仪式感
    setTimeout(() => {
      const staticBlessings = [
        { icon: "💰", title: "暴富签", content: "新的一年科研经费拿到手软，奖学金统统拿下，早日实现财务自由！" },
        { icon: "🎓", title: "顶刊签", content: "顶级期刊随便投！你画的科研插图如同艺术品般完美，文章学术表达犹如神助！" },
        { icon: "🌙", title: "神仙作息签", content: "告别通宵肝 DDL！祝你完美达成凌晨 1 点睡、早晨 9 点起的神仙作息，精神饱满每一天！" },
        { icon: "🎮", title: "峡谷签", content: "科研累了打打游戏，手感火热把把超神，像 T1 教练一样运筹帷幄，轻松上大分！" },
        { icon: "🧪", title: "锦鲤签", content: "不管是梳理代谢通路还是搞碱基编辑，实验一次就 Success，P值永远小于0.05！" }
      ];
      
      // 随机抽取
      const randomIndex = Math.floor(Math.random() * staticBlessings.length);
      const randomBlessing = staticBlessings[randomIndex];
      
      // 拼接用户输入的姓名，增加专属感
      randomBlessing.content = `${userName}，${randomBlessing.content}`;

      setBlessing(randomBlessing);
      setLoading(false);
    }, 1500);
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
              key={activeQuote.answer} // 🔥 修复 3：添加 key 强制刷新组件，确保重玩时题目更新
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
                    className="secondary-btn w-full bg-transparent text-[#666] border border-[#ddd] p-3 rounded-lg mt-4"
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
