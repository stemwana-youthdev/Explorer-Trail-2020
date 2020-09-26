import { Position } from 'src/locations/models/location';

export interface FeaturedLocation {
  uid: number;
  name: string;
  googlePlaceId: string;
  position: Position;
  link: string;
  phone: string;
  email: string;
  featured: boolean;
  address: string;
  featuredImage: string;
  featuredText: string;
  offerText: string;
  order: number;
}
