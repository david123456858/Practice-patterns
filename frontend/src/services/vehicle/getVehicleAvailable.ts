// services/vehicle/vehicleService.ts

import { type Vehicle } from "@/interface/vehicle/vehicleInterface";

export const getAvailableVehicles = async (): Promise<Vehicle[]> => {
    try {
        const response = await fetch(`/api/v1/vehicle/available`);
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error obteniendo vehículos:", error);
        throw error;
    }
};
