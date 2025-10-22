export interface GeoLocation {
    latitude: number
    longitude: number
    timestamp: string
}

export interface Station {
    idStation: string
    name: string
    address: string
    geoLocation: GeoLocation
}
