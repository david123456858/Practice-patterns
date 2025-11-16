
import type { AuthenticatedUser } from "@/interface/user/user";

export const login = async (
    credentials: { email: string; password: string }
): Promise<AuthenticatedUser> => {
    try {
        const response = await fetch(`/api/v1/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.message));

        return data.message as AuthenticatedUser;
    } catch (error) {
        console.error("Error en login:", error);
        throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
    }
};
