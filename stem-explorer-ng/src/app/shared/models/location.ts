export interface Location {
  id: number;
  googlePlaceId: number;
  name: string;
  position: Position;
  link: string;
  locationChallenges: LocationChallengeInfo;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface LocationChallengeInfo {
  challengeCateogry: number;
  challengeDescription: string;
  challengeId: number;
  challengeTitle: string;
}
