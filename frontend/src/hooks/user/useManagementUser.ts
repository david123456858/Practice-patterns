import { useState, useEffect, useMemo } from "react"
import { getUsers } from "@/services/user/getUser"
import type { ApiUser } from "@/interface/user/user"

export function useManagementUser() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<ApiUser[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

    const fetchUsers = async () => {
        try {
            setLoading(true)
            setError(null)
            const usersData = await getUsers()
            setUsers(usersData)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar los usuarios")
            console.error("Error details:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const term = searchTerm.toLowerCase()
            return (
                user.idUser.toLowerCase().includes(term) ||
                user.name.toLowerCase().includes(term) ||
                user.lastName.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term)
            )
        })
    }, [searchTerm, users])

    return {
        loading,
        users,
        error,
        searchTerm,
        setSearchTerm,
        filteredUsers,
        fetchUsers,
    }
}
