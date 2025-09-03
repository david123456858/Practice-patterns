// src/services/stationService.ts

export interface geoLocation {
    latitude: number;
    longitude: number;
    altitude?: string;
    timeStamp?: Date;
}

export interface Station {
    id: string;
    name: string;
    address: string;
    geoLocation: geoLocation;
}

// URL base de la API
const API_BASE_URL = "https://lq3p60dt-3000.use2.devtunnels.ms/";

// Función para crear una nueva estación
export const createStation = async (stationData: Station): Promise<Station> => {
    try {
        const response = await fetch(`${API_BASE_URL}api/v1/station`, {
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