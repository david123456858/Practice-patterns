// src/interface/vehicleInterface.ts

// ======== Interfaces base =========

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

// ======== Vehículo base =========

export interface BaseVehicle {
    idVehicle: string
    vehicleType: string
    color: string
    model: string
    station: Station
    geolocation: GeoLocation
    maxUserWeight: number
    velocityMax: number
    costForMinute: number
    propities: Record<string, any> // o se puede tipar más abajo según el tipo
}

// ======== Tipos específicos =========

export interface BicycleData extends BaseVehicle {
    vehicleType: "bicycle"
    propities: {
        gears: number
        hasBasket: boolean
        info: {
            driveSystem: string
            Type: string
            bearingType: string
        }
    }
}

export interface ElectricBicycleData extends BaseVehicle {
    vehicleType: "electric_bicycle"
    propities: {
        gears: number
        hasBasket: boolean
        info: {
            capacity: number
            autonomyRange: number
        }
    }
}

export interface ScooterData extends BaseVehicle {
    vehicleType: "scooter"
    propities: {
        hasSeat: boolean
        info: {
            driveSystem: string
            Type: string
            bearingType: string
        }
    }
}

export interface ElectricScooterData extends BaseVehicle {
    vehicleType: "electric_scooter"
    propities: {
        hasSeat: boolean
        info: {
            capacity: number
            autonomyRange: number
        }
    }
}

export interface SkateboardData extends BaseVehicle {
    vehicleType: "skateboard"
    propities: {
        deckSize: number
        info: {
            driveSystem: string
            Type: string
            bearingType: string
        }
    }
}

export interface ElectricSkateboardData extends BaseVehicle {
    vehicleType: "electric_skateboard"
    propities: {
        deckSize: number
        info: {
            capacity: number
            autonomyRange: number
        }
    }
}

// ======== Unión de todos los tipos =========

export type VehiclePayload =
    | BicycleData
    | ElectricBicycleData
    | ScooterData
    | ElectricScooterData
    | SkateboardData
    | ElectricSkateboardData
