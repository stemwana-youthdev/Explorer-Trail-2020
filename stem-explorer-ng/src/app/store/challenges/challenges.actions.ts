export class LoadChallengesData {
  public static type = 'LoadChallengesData';
}

export class FilterChallenges {
  public static type = 'FilterChallenges';
  constructor(public filter: number[]) { }
}
