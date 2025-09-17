import { API_BASE_URL } from "../../config/api";

export interface Station {
    idStation: string;
    name: string;
    geoLocation: {
        latitude: number;
        longitude: number;
        timestamp: string;
    };
    address: string;
}

export const createStation = async (stationData: Station): Promise<Station> => {
    try {
        const response = await fetch(`${API_BASE_URL}station`, {
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

// Función para generar ID aleatorio
export const generateRandomId = (): string => {
    const min = 100000000; // 9 dígitos (100,000,000)
    const max = 999999999; // 9 dígitos (999,999,999)
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum.toString();
};

export const getStations = async (): Promise<Station[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}station`);
        const data = await response.json();
        return data.message as Station[];
    } catch (error) {
        console.error("Error fetching stations:", error);
        return [];
    }
};