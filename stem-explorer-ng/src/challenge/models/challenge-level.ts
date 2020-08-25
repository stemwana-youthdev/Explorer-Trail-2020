import { Levels } from 'src/app/shared/enums/levels.enum';
import { AnswerType } from 'src/app/shared/enums/answer-type.enum';

export interface ChallengeLevel {
    uid: number;
    questionText: string;
    difficulty: Levels;
    instructions: string;
    answerType: AnswerType;
    possibleAnswers: string[] | null;
    answers: string[];
    challengeId: number;
    hint: string;
}
