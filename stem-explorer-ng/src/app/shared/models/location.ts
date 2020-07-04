export interface Location {
    uid: number;
    name: string;
    position: {
        lat: number;
        lng: number;
    };
    link: string;
}
