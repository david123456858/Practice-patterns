// services/vehicle/vehicleService.ts
import { VITE_API_URL } from "../../config/api";
import { type Vehicle } from "@/interface/vehicle/vehicleInterface";

export const getAvailableVehicles = async (): Promise<Vehicle[]> => {
    try {
        const response = await fetch(`${VITE_API_URL}vehicle/available`);
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
