// src/interface/vehicle/vehicleInterface.ts

export interface GeoLocation {
    latitude: number
    longitude: number
    timestamp: string
}

export interface Station {
    idStation: string
    name: string
    address: string
    geoLocation: {
        latitude: number
        longitude: number
        timestamp: string
    }
}

export interface InfoMechanical {
    driveSystem?: string
    Type?: string
    bearingType?: string
}

export interface InfoElectric {
    driveSystem?: string
    Type?: string
    bearingType?: string
    capacity?: number           // capacidad de batería
    autonomyRange?: number      // autonomía en km o minutos
}

export interface PropitiesMechanical {
    gears?: number
    hasBasket?: boolean
    hasSeat?: boolean
    deckSize?: number
    info?: InfoMechanical
}

export interface PropitiesElectric {
    gears?: number
    hasBasket?: boolean
    hasSeat?: boolean
    deckSize?: number
    numberOfDoors?: number       // para autos eléctricos
    airConditioning?: boolean    // para autos eléctricos
    capacityBattery?: number     // capacidad total de la batería
    autonomyRange?: number       // rango de autonomía
    info?: InfoElectric
}
export interface VehicleBase {
    idVehicle: string
    vehicleType: string
    color: string
    model: string
    station: Station
    geolocation: GeoLocation
    maxUserWeight: number
    velocityMax: number
    costForMinute: number
}

export interface MechanicalVehicle extends VehicleBase {
    propities: PropitiesMechanical
}

export interface ElectricVehicle extends VehicleBase {
    propities: PropitiesElectric
}

export type Vehicle = MechanicalVehicle | ElectricVehicle
