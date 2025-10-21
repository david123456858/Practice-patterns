import { VITE_API_URL } from "@/config/api";

export interface UserData {
    userId: string;
    userEmail: string;
    userName: string;
    role: string;
}

export const login = async (
    credentials: { email: string; password: string }
): Promise<UserData> => {
    try {
        const response = await fetch(`${VITE_API_URL}auth`, {
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

        localStorage.setItem("user", JSON.stringify(data.message));

        return data.message as UserData;
    } catch (error) {
        console.error("Error en login:", error);
        throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
    }
};

