import type { User } from "@/types/classes/user";
import { API_BASE_URL } from "../../config/api";

// Función para crear un nuevo usuario
export const createUser = async (userData: {
    idUser: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    password2: string;
}): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};