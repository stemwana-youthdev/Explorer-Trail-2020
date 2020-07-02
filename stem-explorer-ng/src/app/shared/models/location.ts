export interface Location {
    uid: number;
    name: string;
    position: {
        [key: string]: Position
    };
    link: string;
    category: number;
}

export interface Position {
    lat: number;
    lng: number;
}
