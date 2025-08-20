export type QuestionType = 'single-select' | 'multi-select';

export interface Option {
  id: number;
  label: string;
  min?: number;
  max?: number;
}

export interface Question {
  key: string;
  text: string;
  type: QuestionType;
  options: Option[];
}

export type AnswerValue = number | number[] | null;
export type AnswerMap = Record<string, AnswerValue>;

export type Range = { min: number; max: number };
export interface TodaySubmitPayload {
  categories: string[];
  players_range: Range;
  playtime_range: Range;
  age_group: Range;
  difficulty_range: Range;
}

export interface TodaySubmitResponse {
  message: string;
  games: TodayGame[];
}

export interface TodayGame {
  title: string;
  thumbnail_url: string;
  category: string;
  players: string;
  difficulty: string;
  genre: string;
  description: string;
  top_review?: Record<string, string>;
}
