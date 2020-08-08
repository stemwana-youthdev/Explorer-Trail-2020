export interface Progress {
  challengeId: number;
  completedLevels: CompletedLevel[];
}

export interface CompletedLevel {
  userId: string;
  challengeLevelId: number;
}
