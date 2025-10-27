import { VITE_API_URL } from "@/config/api";
import type { Vehicle, VehicleResponse } from "@/interface/vehicle/vehicleInterface";

export const getAllVehicles = async (): Promise<Vehicle[]> => {
    try {
        const response = await fetch(`${VITE_API_URL}vehicle`);

        if (!response.ok) {
            throw new Error(`Error al obtener vehículos: ${response.status} ${response.statusText}`);
        }

        const data: VehicleResponse = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
};
