export interface Location {
  uid: number;
  name: string;
  position: Position;
  challengetitle: string;
  challengedescription: string;
  challengeid: number;
  category: number;
  link: string;
}

export interface Position {
  lat: number;
  lng: number;
}
