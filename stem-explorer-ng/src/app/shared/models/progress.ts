export interface UserProgress {
  userId: string;
  challengeId: number;
  challengeLevelId: number;
  attempts: number;
  correct: boolean;
}
