import { VITE_API_URL } from "../../config/api"
import { type BaseVehicle } from "@/interface/vehicle"

// SE SUPONE QUE ESTA LISTO

export const createVehicle = async (vehicle: BaseVehicle) => {
    try {
        // Validar campos obligatorios antes de enviar
        if (!vehicle.idVehicle || !vehicle.vehicleType || !vehicle.station) {
            throw new Error("Faltan datos obligatorios del vehículo")
        }

        const response = await fetch(`${VITE_API_URL}vehicle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idVehicle: vehicle.idVehicle,
                vehicleType: vehicle.vehicleType,
                color: vehicle.color,
                model: vehicle.model,
                station: {
                    idStation: vehicle.station.idStation,
                    name: vehicle.station.name,
                    address: vehicle.station.address,
                    geoLocation: {
                        latitude: vehicle.station.geoLocation.latitude,
                        longitude: vehicle.station.geoLocation.longitude,
                        timestamp: vehicle.station.geoLocation.timestamp,
                    },
                },
                geolocation: {
                    latitude: vehicle.geolocation.latitude,
                    longitude: vehicle.geolocation.longitude,
                    timestamp: vehicle.geolocation.timestamp,
                },
                maxUserWeight: vehicle.maxUserWeight,
                velocityMax: vehicle.velocityMax,
                costForMinute: vehicle.costForMinute,
                propities: vehicle.propities,
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error ${response.status}: ${errorText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error creando vehículo:", error)
        throw error
    }
}
