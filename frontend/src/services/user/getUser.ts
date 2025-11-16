
import type { ApiUser, ApiResponse } from "@/interface/user/user";

export const getUsers = async (): Promise<ApiUser[]> => {
    try {
        const response = await fetch(`/api/v1/user`, {
            headers: { "Accept": "application/json" },
        })

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

        const data: ApiResponse = await response.json()

        const formattedUsers = data.message.map((user) => ({
            ...user,
            createdAt: new Date(user.createdAt).toLocaleString("es-CO", {
                dateStyle: "short",
                timeStyle: "short",
            }),
        }))

        return formattedUsers
    } catch (error) {
        console.error("Error fetching users:", error)
        throw new Error("Failed to fetch users")
    }
}
