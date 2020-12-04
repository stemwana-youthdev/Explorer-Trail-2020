import { QuestionType } from '../enums/question-type.enum';

export interface ChallengeLevel {
  id: number;
  questionText: string;
  difficulty: number;
  instructions: string;
  answerType: QuestionType;
  possibleAnswers: string[];
  answers: string[];
  challengeId: number;
  hint: string;
}
