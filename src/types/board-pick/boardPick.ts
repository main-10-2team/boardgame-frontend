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
