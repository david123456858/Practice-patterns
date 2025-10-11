import { API_BASE_URL } from "../../config/api";
import { type BicycleData, type ScooterData, type SkateboardData } from "@/interface/vehicleInterface";

type VehiclePayload = BicycleData | ScooterData | SkateboardData

export const createVehicle = async (vehicle: VehiclePayload) => {
    try {
        let endpoint = ""

        switch (vehicle.vehicleType) {
            case "bicycle":
                endpoint = "bicycle"
                break
            case "electric_scooter":
                endpoint = "scooter"
                break
            case "skateboard":
                endpoint = "skateboard"
                break
            default:
                throw new Error("Tipo de vehículo no soportado")
        }

        const response = await fetch(`${API_BASE_URL}vehicle/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicle),
        })

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

        return await response.json()
    } catch (error) {
        console.error("Error creando vehículo:", error)
        throw error
    }
}