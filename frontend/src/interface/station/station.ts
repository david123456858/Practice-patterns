export interface GeoLocation {
    latitude: number
    longitude: number
    timestamp: string | Date
}

export interface Station {
    idStation: string;
    name: string;
    address: string;
    geoLocation: GeoLocation;
}
