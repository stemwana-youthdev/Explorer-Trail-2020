export interface Location {
    id: number;
    name: string;
    position: {
        lat: number;
        lng: number;
    };
    link: string;
}
