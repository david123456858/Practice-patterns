import { VITE_API_URL } from "@/config/api";
import type { User, RegisterUserData } from "@/interface/user/user";

export const register = async (userData: RegisterUserData): Promise<User> => {
    try {
        const response = await fetch(`${VITE_API_URL}auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();
        return data as User;

    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
};
