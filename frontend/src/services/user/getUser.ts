import { API_BASE_URL } from "../../config/api";

export interface Role {
    idRole: string;
    name: string;
    permissions: string[];
}

export interface ApiUser {
    role: Role[];
    loanHistory: any[];
    idUser: string;
    email: string;
    lastName: string;
    name: string;
    suscription: string | null;
    password: string;
}

export interface ApiResponse {
    message: ApiUser[];
}

export const getUsers = async (): Promise<ApiUser[]> => {
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