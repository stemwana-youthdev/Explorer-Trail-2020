import { AnswerType } from '../enums/answer-type.enum';
import { Levels } from '../enums/levels.enum';

export interface ChallengeLevel {
    uid: number;
    questionText: string;
    difficulty: Levels;
    instructions: string;
    answerType: AnswerType;
    possibleAnswers: ChallengeAnswer[];
    challengeId: number;
    hint: string;
}

export interface ChallengeAnswer {
    uid: number;
    answerText: string;
    isCorrect: boolean;
}
