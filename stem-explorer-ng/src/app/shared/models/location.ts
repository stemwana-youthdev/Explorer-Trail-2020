export interface Location {
  uid: number;
  name: string;
  position: Position;
  challengetitle: string;
  challengedescription: string;
  category: number;
  link: string;
}

export interface Position {
  lat: number;
  lng: number;
}
