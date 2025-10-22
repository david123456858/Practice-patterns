import { VITE_API_URL } from "@/config/api"

export interface GeoLocation {
    latitude: number;
    longitude: number;
    timestamp: string;
}

export interface BatteryInfo {
    capacity: number;
    autonomyRange: number;
}

export interface Vehicle {
    idVehicle: string;
    color: string;
    model: string;
    idStation: string;
    name: string;
    state: "AVAILABLE" | "IN_USE" | "MAINTENANCE" | "OUT_OF_SERVICE";
    type: string;
    geoLocation: GeoLocation;
    maxUserWeight: number;
    velocityMax: number;
    costForMinute: number;
    gears?: number;
    hasBasket?: boolean;
    hasSeat?: boolean;
    batteryInfo?: BatteryInfo;
}

export interface VehicleResponse {
    message: Vehicle[];
}

export const getAllVehicles = async (): Promise<Vehicle[]> => {
    try {
        const response = await fetch(`${VITE_API_URL}vehicle`);

        if (!response.ok) {
            throw new Error(`Error al obtener vehículos: ${response.status} ${response.statusText}`);
        }

        const data: VehicleResponse = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};