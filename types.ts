
export enum AppState {
  LOBBY = 'LOBBY',
  QUIZ = 'QUIZ',
  REVEAL = 'REVEAL',
  PUNISHMENT = 'PUNISHMENT'
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  fact: string;
}

export interface Blessing {
  title: string;
  content: string;
  category: 'Wealth' | 'Health' | 'Wisdom';
  icon: string;
}
