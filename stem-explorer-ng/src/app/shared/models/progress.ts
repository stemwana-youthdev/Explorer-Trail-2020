export interface Progress {
  userId: string;
  challengeId: number;
  challengeLevelId: number;
  attempts: number;
  correct: boolean;
}
