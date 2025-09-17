// services/auth/loginService.ts
import { API_BASE_URL } from "../../config/api";

interface Role {
    idRole: string;
    name: string;
    permissions: string[];
}

export interface UserData {
    userId: string;
    userEmail: string;
    userName: string;
    role: Role[];
}

export const loginUser = async (
    credentials: { email: string; password: string }
): Promise<UserData> => {
    try {
        const response = await fetch(`${API_BASE_URL}auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // ✅ Guardamos el usuario logueado
        localStorage.setItem("user", JSON.stringify(data.message));

        return data.message as UserData;
    } catch (error) {
        console.error("Error en login:", error);
        throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
    }
};

