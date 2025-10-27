import type { Station, GeoLocation } from "@/interface/station/station";

export interface InfoMechanical {
    driveSystem?: string;
    Type?: string;
    bearingType?: string;
}

export interface InfoElectric extends InfoMechanical {
    capacity?: number;
    autonomyRange?: number;
}

export interface PropitiesMechanical {
    gears?: number;
    hasBasket?: boolean;
    hasSeat?: boolean;
    deckSize?: number;
    info?: InfoMechanical;
}

export interface PropitiesElectric extends PropitiesMechanical {
    numberOfDoors?: number;
    airConditioning?: boolean;
    capacityBattery?: number;
    autonomyRange?: number;
    info?: InfoElectric;
}

// 🔹 Base general de vehículo
export interface VehicleBase {
    idVehicle: string;
    vehicleType: string;
    color: string;
    model: string;
    station: Station;              
    stationId?: string;             
    geolocation: GeoLocation;       
    maxUserWeight: number;
    velocityMax: number;
    costForMinute: number;
    state?: "AVAILABLE" | "IN_USE" | "MAINTENANCE" | "OUT_OF_SERVICE";
    name?: string;                  
}

export interface MechanicalVehicle extends VehicleBase {
    propities: PropitiesMechanical;
}

export interface ElectricVehicle extends VehicleBase {
    propities: PropitiesElectric;
}

export type Vehicle = MechanicalVehicle | ElectricVehicle;

export interface VehicleResponse {
    message: Vehicle[];
}
