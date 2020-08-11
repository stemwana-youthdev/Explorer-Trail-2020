import { AnswerType } from '../enums/answer-type.enum';
import { Levels } from '../enums/levels.enum';

export interface ChallengeLevel {
    uid: number;
    questionText: string;
    difficulty: Levels;
    instructions: string;
    answerType: AnswerType;
    possibleAnswers: string[];
    answers: string[];
    challengeId: number;
    hint: string;
}
