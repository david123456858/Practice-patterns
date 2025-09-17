export interface BaseVehicle {
    idVehicle: string
    color: string
    model: string
    idStation: string
    latitude: number
    longitude: number
    maxUserWeight: number
    velocityMax: number
    costForMinute: number
    vehicleType: string
}

export interface BicycleData extends BaseVehicle {
    vehicleType: "BICYCLE"
    gears: number
    hasBasket: boolean
}

export interface ScooterData extends BaseVehicle {
    vehicleType: "electric_scooter"
    hasSeat: boolean
    batteryInfo: {
        capacity: number
        autonomyRange: number
    }
}

export interface SkateboardData extends BaseVehicle {
    vehicleType: "skateboard"
    deckSize: number
}

export interface VehiclePayload {
    model: string
    color: string
    station: {
        idStation: string
        latitude: number
        longitude: number
    }
}

export interface Vehicle {
    idVehicle: string
    color: string
    model: string
    idStation: string
    state: string
    type: string
    costForMinute: number
    gears?: number
    hasBasket?: boolean
    hasSeat?: boolean
    batteryInfo?: {
        capacity: number
        autonomyRange: number
    }
    nameStation: string
}