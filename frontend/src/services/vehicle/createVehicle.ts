
import { type Vehicle } from "@/interface/vehicle/vehicleInterface"

export const createVehicle = async (vehicle: Vehicle) => {
    try {
        if (!vehicle.idVehicle || !vehicle.vehicleType || !vehicle.station) {
            throw new Error("Faltan datos obligatorios del vehículo")
        }

        const normalizedType = vehicle.vehicleType.toLowerCase()

        const toIsoTimestamp = (ts: string | Date) => {
            try {
                if (typeof ts === "string") {
                    const parsed = new Date(ts)
                    if (!isNaN(parsed.getTime())) return parsed.toISOString()
                }
                if (ts instanceof Date) return ts.toISOString()
            } catch { }
            return new Date().toISOString() 
        }

        const baseData: any = {
            idVehicle: vehicle.idVehicle,
            vehicleType: normalizedType,
            color: vehicle.color,
            model: vehicle.model,
            station: {
                idStation: vehicle.station.idStation,
                name: vehicle.station.name,
                address: vehicle.station.address,
                geoLocation: {
                    latitude: vehicle.station.geoLocation.latitude,
                    longitude: vehicle.station.geoLocation.longitude,
                    timestamp: toIsoTimestamp(vehicle.station.geoLocation.timestamp),
                },
            },
            geolocation: {
                latitude: vehicle.geolocation.latitude,
                longitude: vehicle.geolocation.longitude,
                timestamp: toIsoTimestamp(vehicle.geolocation.timestamp),
            },
            maxUserWeight: vehicle.maxUserWeight,
            velocityMax: vehicle.velocityMax,
            costForMinute: vehicle.costForMinute,
        }

        switch (vehicle.vehicleType) {
            case "BICYCLE":
                baseData.propities = {
                    gears: vehicle.propities.gears,
                    hasBasket: vehicle.propities.hasBasket,
                    info: {
                        driveSystem: vehicle.propities.info?.driveSystem,
                        Type: vehicle.propities.info?.Type,
                        bearingType: vehicle.propities.info?.bearingType,
                    },
                }
                break

            case "SCOOTER":
                baseData.propities = {
                    hasSeat: vehicle.propities.hasSeat,
                    info: {
                        driveSystem: vehicle.propities.info?.driveSystem,
                        Type: vehicle.propities.info?.Type,
                        bearingType: vehicle.propities.info?.bearingType,
                    },
                }
                break

            case "SKATEBOARD":
                baseData.propities = {
                    deckSize: vehicle.propities.deckSize,
                    info: {
                        driveSystem: vehicle.propities.info?.driveSystem,
                        Type: vehicle.propities.info?.Type,
                        bearingType: vehicle.propities.info?.bearingType,
                    },
                }
                break

            case "ELECTRIC_BICYCLE":
            case "ELECTRIC_SCOOTER":
            case "ELECTRIC_SKATEBOARD":
            case "ELECTRIC_CAR": {
                const props = vehicle.propities as any
                baseData.propities = {
                    ...(props.numberOfDoors && { numberOfDoors: props.numberOfDoors }),
                    ...(props.airConditioning !== undefined && { airConditioning: props.airConditioning }),
                    ...(props.deckSize && { deckSize: props.deckSize }),
                    capacityBattery: props.capacityBattery,
                    autonomyRange: props.autonomyRange,
                    info: {
                        capacity: props.info?.capacity,
                        autonomyRange: props.info?.autonomyRange,
                    },
                }
                break
            }

            default:
                throw new Error(`Tipo de vehículo no soportado: ${vehicle.vehicleType}`)
        }

        const response = await fetch(`/api/v1/vehicle`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(baseData),
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
