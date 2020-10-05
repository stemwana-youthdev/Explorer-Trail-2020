import { Challenge } from './challenges.model';

export interface Location {
  uid: number;
  name: string;
  position: Position;
  googlePlaceId: string;
  link?: string;
  phone?: string;
  email?: string;
  address?: string;
  locationChallenges?: Challenge[];
  challengeCount: number;
  featured: boolean;
  featuredImage?: string;
  featuredText?: string;
  offerText?: string;
  order?: number;
}

export interface Position {
  lat: number;
  lng: number;
}
