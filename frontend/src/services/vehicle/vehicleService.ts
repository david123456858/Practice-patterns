import { API_BASE_URL } from "../../config/api";

export interface TypeVehicle {
    id?: string;
    name: string;
    costForDuration: number;
}

export interface ApiResponse {
    message: TypeVehicle[];
}


// Función para obtener todos los tipos de vehículos
export const getTypeVehicles = async (): Promise<TypeVehicle[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}typeVehicle`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        return data.message || [];
    } catch (error) {
        console.error('Error fetching type vehicles:', error);
        throw new Error('Failed to fetch type vehicles');
    }
};

// Función para crear un nuevo tipo de vehículo
export const createTypeVehicle = async (typeVehicleData: Omit<TypeVehicle, 'id'>): Promise<TypeVehicle> => {
    try {
        const response = await fetch(`${API_BASE_URL}typeVehicle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(typeVehicleData),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating type vehicle:', error);
        throw new Error('Failed to create type vehicle');
    }
};