import { AnswerType } from '../enums/answer-type.enum';

export interface ChallengeLevel {
    uid: number;
    questionText: string;
    difficulty: number;
    instructions: string;
    answerType: AnswerType;
    possibleAnswers: ChallengeAnswer[];
    challengeId: number;
    hint: string;
    answerType: number;
}

export interface ChallengeAnswer {
    uid: number;
    answerText: string;
    isCorrect: boolean;
}
