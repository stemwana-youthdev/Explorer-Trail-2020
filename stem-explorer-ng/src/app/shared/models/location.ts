export interface Location {
  uid: number;
  name: string;
  position: Position;
  challengeTitle: string;
  challengeDescription: string;
  challengeId: number;
  category: number;
  link: string;
  distance?: number;
}

export interface Position {
  lat: number;
  lng: number;
}
