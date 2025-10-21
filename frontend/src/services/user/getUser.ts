import { VITE_API_URL } from "@/config/api"

export interface ApiUser {
    idUser: string
    name: string
    lastName: string
    email: string
    role: string
    password: string
    createdAt: string
}

export interface ApiResponse {
    message: ApiUser[]
}

export const getUsers = async (): Promise<ApiUser[]> => {
    try {
        const response = await fetch(`${VITE_API_URL}user`, {
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
