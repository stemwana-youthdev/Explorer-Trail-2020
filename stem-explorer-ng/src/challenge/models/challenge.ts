import { QuestionType } from 'src/app/shared/enums/answer-type.enum';

export interface Challenge {
    id: number;
    title: string;
    description: string;
    category: number;
    locationId: number;
    challengeLevels: ChallengeLevel[];
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
    complete?: boolean;
}
