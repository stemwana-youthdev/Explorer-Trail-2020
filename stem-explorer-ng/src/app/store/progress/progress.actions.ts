export class WatchProgress {
  public static type = 'WatchProgress';
  constructor() {}
}

export class CompleteLevel {
  public static type = 'CompleteLevel';
  constructor(
    public profileId: number,
    public challengeId: number,
    public levelId: number,
    public correct: boolean,
  ) {}
}
