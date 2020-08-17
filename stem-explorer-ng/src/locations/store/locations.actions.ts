export class LoadLocationsData {
  public static type = 'LoadLocationsData';
}

export class FilterLocations {
  public static type = 'FilterLocations';
  constructor(public filter: number[]) {}
}
