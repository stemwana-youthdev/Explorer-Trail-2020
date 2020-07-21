export interface ChallengeLevel {
    uid: number;
    questionText: string;
    difficulty: number;
    instructions: string;
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
