
import React, { useState, useEffect, useRef } from 'react';
import { VerificationQuote } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface VerificationPortalProps {
  quote: VerificationQuote;
  onVerify: (answer: string) => void;
  isError: boolean;
  onResetError: () => void;
}

const VerificationPortal: React.FC<VerificationPortalProps> = ({ quote, onVerify, isError, onResetError }) => {
  const [inputValue, setInputValue] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [quote]);

  // Trigger shake animation every time an error is detected
  useEffect(() => {
    if (isError) {
      setShakeKey(prev => prev + 1);
    }
  }, [isError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      // Small nudge for empty input
      setShakeKey(prev => prev + 1);
      return;
    }
    onVerify(trimmedValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (isError) {
      onResetError();
    }
  };

  return (
    <div 
      key={shakeKey}
      className={`bg-white rounded-2xl p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center w-full max-w-[420px] transition-all ${isError ? 'shake' : ''}`}
    >
      <header className="mb-10">
        <h1 className="text-[1.8rem] font-extrabold text-[#1a1a1a] mb-2 tracking-tight">
          2026新春祝福
        </h1>
        <p className="text-sm text-[#666666] leading-relaxed">
          请补全以下实验室高频语录以验证身份：
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[1.2rem] md:text-[1.3rem] font-medium leading-[1.8] py-4 text-[#1a1a1a]">
          <span className="whitespace-pre-wrap">{quote.prefix}</span>
          <div className="relative group">
            <input 
              ref={inputRef}
              type="text"
              autoComplete="off"
              className={`bg-transparent border-b-2 ${isError ? 'border-[#d32f2f]' : 'border-[#1a1a1a]'} focus:outline-none focus:border-[#005499] px-2 min-w-[80px] text-center transition-all text-[#005499] font-bold placeholder-gray-100`}
              placeholder="???"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <span className="whitespace-pre-wrap">{quote.suffix}</span>
        </div>

        <div className="flex flex-col items-center">
          <button 
            type="submit"
            className="w-full bg-[#1a1a1a] hover:bg-[#005499] text-white font-bold py-4 rounded-lg transition-all transform active:scale-98 tracking-widest text-sm uppercase shadow-md"
          >
            确定
          </button>
          
          <AnimatePresence>
            {isError && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-[#d32f2f] text-[0.85rem] font-bold"
              >
                ❌ 匹配失败，再想想导师怎么说的？
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>

      <div className="mt-8 text-[9px] font-mono text-gray-300 tracking-[0.3em] uppercase opacity-50">
        secure_lab_verification_v2.6
      </div>
    </div>
  );
};

export default VerificationPortal;
