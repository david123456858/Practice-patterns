// services/auth/loginService.ts
import { API_BASE_URL } from "../../config/api";

export const loginUser = async (credentials: { email: string; password: string }): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

    } catch (error) {
        console.error('Error en login:', error);
        throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
};