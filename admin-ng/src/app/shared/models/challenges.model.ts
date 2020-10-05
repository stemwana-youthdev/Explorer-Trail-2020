import { QuestionType } from '../enums/question-type.enum';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: number;
  levels?: ChallengeLevel[];
  locationId?: number;
}

export interface ChallengeLevel {
  id: number;
  question: string;
  instructions: string;
  difficulty: number;
  hint: string;
  questionType: QuestionType;
  answer: string[];
  possibleAnswers?: string[];
}
