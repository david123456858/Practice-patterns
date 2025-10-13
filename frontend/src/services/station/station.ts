import { VITE_API_URL } from "../../config/api";

export interface Station {
    idStation: string;
    nameStation: string;
    geoLocation: {
        latitude: number;
        longitude: number;
        timestamp: string;
    };
    address: string;
}

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
        const response = await fetch(`${VITE_API_URL}station`);
        const data = await response.json();
        return data.message as Station[];
    } catch (error) {
        console.error("Error fetching stations:", error);
        return [];
    }
};