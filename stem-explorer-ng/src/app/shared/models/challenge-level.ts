import { AnswerType } from '../enums/answer-type.enum';

export interface ChallengeLevel {
    uid: number;
    questionText: string;
    difficulty: number;
    instructions: string;
    answerType: AnswerType;
    possibleAnswers: string[];
    answer: string[];
    challengeId: number;
    hint: string;
}
