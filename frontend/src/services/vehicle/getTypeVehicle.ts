import { API_BASE_URL } from "@/config/api"

export interface VehicleTypesResponse {
    message: Record<string, string>;
}

export const getVehicleTypes = async (): Promise<Record<string, string>> => {
    try {
        const response = await fetch(`${API_BASE_URL}vehicle/types`)
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
        const data: VehicleTypesResponse = await response.json()
        return data.message || {}
    } catch (error) {
        console.error("Error fetching vehicle types:", error)
        throw new Error("Failed to fetch vehicle types")
    }
}