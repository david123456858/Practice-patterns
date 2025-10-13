import { useState, useEffect, useMemo } from "react"
import { getUsers, type ApiUser } from "@/services/user/getUser"

import { Search, Filter, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function ManagementUser() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<ApiUser[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [subscriptionFilter, setSubscriptionFilter] = useState("all")

    // Cargar usuarios al montar el componente
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            setError(null)
            const usersData = await getUsers()
            setUsers(usersData)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar los usuarios')
            console.error("Error details:", err)
        } finally {
            setLoading(false)
        }
    }

    // Filtrar usuarios basado en búsqueda y filtro de suscripción
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.idUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())

            const userSubscription = user.suscription || "Sin Suscripción"
            const matchesSubscription =
                subscriptionFilter === "all" ||
                userSubscription.toLowerCase() === subscriptionFilter.toLowerCase()

            return matchesSearch && matchesSubscription
        })
    }, [searchTerm, subscriptionFilter, users])

    // const handleEdit = (userId: string) => {
    // }

    // const handleDelete = (userId: string) => {
    // }

    const getSubscriptionDisplay = (subscription: string | null) => {
        if (!subscription) return "Sin Suscripción"

        // Mapear posibles valores de suscripción a nombres más amigables
        const subscriptionMap: Record<string, string> = {
            "PREMIUM": "Premium",
            "BASIC": "Básico",
            "STANDARD": "Estándar"
        }

        return subscriptionMap[subscription] || subscription
    }

    if (loading) {
        return (
            <div className="flex-1 p-8 bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="h-12 w-12 text-green-500 animate-spin mx-auto mb-4" />
                    <p className="text-green-600">Cargando usuarios...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex-1 p-8 bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error al cargar los usuarios</p>
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                    <Button onClick={fetchUsers} className="bg-green-600 hover:bg-green-700">
                        Reintentar
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-8 bg-gradient-to-br from-green-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-green-800 mb-2">Gestión de Usuarios</h1>
                        <p className="text-green-600">Administra y supervisa todos los usuarios registrados en EcoMove</p>
                    </div>
                    <Button onClick={fetchUsers} variant="outline" className="border-green-300 text-green-700">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Actualizar
                    </Button>
                </div>

                {/* Filtros y búsqueda */}
                <Card className="mb-6 border-green-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filtros y Búsqueda
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            {/* Buscador */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-green-700 mb-2">Buscar Usuario</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                                    <Input
                                        placeholder="Buscar por ID, nombre, apellido o email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            {/* Filtro por suscripción */}
                            <div className="w-full md:w-48">
                                <label className="block text-sm font-medium text-green-700 mb-2">Filtrar por Suscripción</label>
                                <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                                    <SelectTrigger className="border-green-200 focus:border-green-500">
                                        <SelectValue placeholder="Todas las suscripciones" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas las suscripciones</SelectItem>
                                        <SelectItem value="sin suscripción">Sin Suscripción</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                        <SelectItem value="básico">Básico</SelectItem>
                                        <SelectItem value="estándar">Estándar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla de usuarios */}
                <Card className="border-green-200 shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg text-green-800">
                                Usuarios Registrados ({filteredUsers.length})
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-green-200">
                                        <TableHead className="text-green-700 font-semibold">ID</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Nombre</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Apellido</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Email</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Suscripción</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Rol</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.idUser} className="border-green-100 hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{user.idUser}</TableCell>
                                            <TableCell className="text-green-700">{user.name}</TableCell>
                                            <TableCell className="text-green-700">{user.lastName}</TableCell>
                                            <TableCell className="text-green-600">{user.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        user.suscription
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : "bg-gray-50 text-gray-700 border-gray-200"
                                                    }
                                                >
                                                    {getSubscriptionDisplay(user.suscription)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {user.role && user.role.length > 0 ? (
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            user.role[0].name.toLowerCase() === "admin"
                                                                ? "bg-red-50 text-red-700 border-red-200"
                                                                : "bg-blue-50 text-blue-700 border-blue-200"
                                                        }
                                                    >
                                                        {user.role[0].name}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-gray-500">Sin Rol</span>
                                                )}
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-green-600">
                                    No se encontraron usuarios que coincidan con los criterios de búsqueda.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ManagementUser