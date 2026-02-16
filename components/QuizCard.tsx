
import React from 'react';
import { Question } from '../types';
import { motion } from 'framer-motion';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  progress: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, progress }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border-b-8 border-yellow-600">
      <div className="flex justify-between items-center mb-4">
        <span className="text-red-700 font-bold text-sm tracking-widest uppercase">The Lab Challenge</span>
        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">{progress}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(idx === question.correctIndex)}
            className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-red-500 hover:bg-red-50 transition-all text-gray-700 font-medium group flex justify-between items-center"
          >
            <span>{option}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">🏮</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
