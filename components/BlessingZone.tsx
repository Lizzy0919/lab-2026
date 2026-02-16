
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface BlessingZoneProps {
  category: 'Wealth' | 'Health' | 'Wisdom';
  content: string;
  delay: number;
}

const BlessingZone: React.FC<BlessingZoneProps> = ({ category, content, delay }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 border ${
        isRevealed ? 'bg-white border-[#005499]' : 'bg-gray-50 border-gray-100'
      } hover:border-[#005499]/30`}
      onClick={() => setIsRevealed(true)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg transition-colors ${isRevealed ? 'text-[#005499]' : 'text-gray-400'}`}>
            {ICONS[category]}
          </div>
          <div>
            <h4 className={`font-bold text-sm tracking-wide transition-colors ${isRevealed ? 'text-[#1a1a1a]' : 'text-[#666666]'}`}>
              {category === 'Wealth' ? '财源广进' : category === 'Health' ? '龙马精神' : '智圆行方'}
            </h4>
            {!isRevealed && (
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Click to decrypt...</p>
            )}
          </div>
        </div>
        {!isRevealed && (
          <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 text-[10px] font-bold">
            福
          </div>
        )}
      </div>

      <AnimatePresence>
        {isRevealed && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="px-6 pb-5 overflow-hidden"
          >
            <div className="border-t border-gray-100 pt-4">
              <p className="text-[#666666] leading-relaxed text-[1rem] italic">
                "{content}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlessingZone;
