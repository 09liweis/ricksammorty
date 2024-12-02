export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    location: Location;
    origin: Location;
    episode: string[];
    url: string;
    created: string;
}

export interface Location {
    name: string;
    url: string;
    type?: string;
    dimension?: string;
    residents?: string[];
}
