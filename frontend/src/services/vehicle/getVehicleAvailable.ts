// services/vehicle/vehicleService.ts
import { API_BASE_URL } from "../../config/api";
import { type Vehicle } from "@/interface/vehicleInterface";

export const getAvailableVehicles = async (): Promise<Vehicle[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}vehicle/available`);
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
