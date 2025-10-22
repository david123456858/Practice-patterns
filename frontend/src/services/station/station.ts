import { VITE_API_URL } from "../../config/api";
import { type Station } from "@/interface/vehicle/vehicleInterface"

export const createStation = async (stationData: Station): Promise<Station> => {
    try {
        const response = await fetch(`${VITE_API_URL}station`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stationData),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating station:', error);
        throw new Error('Failed to create station');
    }
};

export const getStations = async (): Promise<Station[]> => {
    try {
        const response = await fetch(`${VITE_API_URL}station`)
        const data = await response.json()

        const formattedStations: Station[] = data.message.map((station: any) => ({
            idStation: station.idStation,
            name: station.name,
            address: station.address,
            geoLocation: {
                latitude: parseFloat(station.latitude),
                longitude: parseFloat(station.longitude),
                timestamp: new Date(station.locationTimestamp).toLocaleString("es-CO", {
                    dateStyle: "short",
                    timeStyle: "short",
                }),
            },
        }))

        return formattedStations
    } catch (error) {
        console.error("Error fetching stations:", error)
        return []
    }
}

