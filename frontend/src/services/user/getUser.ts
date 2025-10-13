import { VITE_API_URL } from "@/config/api";

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
        const response = await fetch(`${VITE_API_URL}user`, {
            headers: {
                "Accept": "application/json",
            },
        });

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