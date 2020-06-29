import { Location } from './location';

export interface Challenge {
    id: number;
    title: string;
    description: string;
    category: number;
    location: Location;
}
