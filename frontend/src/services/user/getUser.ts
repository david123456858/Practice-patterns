import type { User } from "@/types/classes/user";
import { API_BASE_URL } from "../../config/api";

export interface ApiResponse {
    message: User[];
}

// Mapeo de tipos de suscripción a IDs
export const subscriptionMapping = {
    "ANNUAL": "1",
    "MONTH": "2",
    "SEMIANNUAL": "3"
};

// Mapeo inverso para mostrar en la UI
export const subscriptionOptions = [
    { id: "1", label: "ANNUAL", displayName: "Annual Subscription" },
    { id: "2", label: "MONTH", displayName: "Monthly Subscription" },
    { id: "3", label: "SEMIANNUAL", displayName: "Semi-Annual Subscription" }
];

// Función para obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}user`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        return data.message || []; // Aseguramos que siempre retorne un array
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};