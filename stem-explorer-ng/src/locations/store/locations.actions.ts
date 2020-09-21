export class LoadLocationsData {
  public static type = 'LoadLocationsData';
}

export class LevelCompleted {
  public static type = 'LevelCompleted';
  constructor(public difficulty: number, public challengeId: number) {}
}
