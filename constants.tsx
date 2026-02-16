
import React from 'react';

export interface VerificationQuote {
  prefix: string;
  suffix: string;
  answer: string; 
}

export const LAB_QUOTES: VerificationQuote[] = [
  { prefix: "你是这个领域的", answer: "专家", suffix: "" },
  { prefix: "你要讲一个完整的", answer: "故事", suffix: "" },
  { prefix: "你要是做实验累了就读读", answer: "文献", suffix: "" },
  { prefix: "明天开", answer: "组会", suffix: "" },
  { prefix: "你这个好好做可以投", answer: "顶刊", suffix: "" },
  { prefix: "你的", answer: "创新点", suffix: "在哪里" },
  { prefix: "同学们，今天是", answer: "工作日", suffix: "吧" }
];

export const ICONS = {
  Wealth: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Health: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Wisdom: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
};
