export interface Location {
  uid: number;
  name: string;
  position: LocationCoords;
  contact: string;
  link: string;
  placeId: string;
}

export interface LocationCoords {
  lat: number;
  lng: number;
}
