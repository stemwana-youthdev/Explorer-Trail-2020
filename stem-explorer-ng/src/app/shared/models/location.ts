export interface Location {
    uid: number;
    name: string;
    position: {
        [key: string]: Position
    };
    link: string;
}

export interface Position {
    lat: number;
    lng: number;
}
