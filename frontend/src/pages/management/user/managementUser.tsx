import { useState, useEffect, useMemo } from "react"
import { getUsers } from "@/services/user/userServices"
import type { User as UserType } from "@/types/classes/user"

import { Search, Filter, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo para los usuarios
const mockUsers = [
    {
        id: 1,
        cc: "1234567890",
        fullName: "Juan Carlos Pérez",
        email: "juan.perez@email.com",
        subscription: "Premium",
        status: "Activo",
        role: "Usuario",
    },
    {
        id: 2,
        cc: "0987654321",
        fullName: "María Elena González",
        email: "maria.gonzalez@email.com",
        subscription: "Básico",
        status: "Activo",
        role: "Usuario",
    },
    {
        id: 3,
        cc: "1122334455",
        fullName: "Carlos Alberto Rodríguez",
        email: "carlos.rodriguez@email.com",
        subscription: "Premium",
        status: "Inactivo",
        role: "Administrador",
    },
    {
        id: 4,
        cc: "5566778899",
        fullName: "Ana Sofía Martínez",
        email: "ana.martinez@email.com",
        subscription: "Estándar",
        status: "Activo",
        role: "Usuario",
    },
    {
        id: 5,
        cc: "9988776655",
        fullName: "Luis Fernando Torres",
        email: "luis.torres@email.com",
        subscription: "Básico",
        status: "Suspendido",
        role: "Usuario",
    },
    {
        id: 6,
        cc: "4433221100",
        fullName: "Isabella Ramírez",
        email: "isabella.ramirez@email.com",
        subscription: "Premium",
        status: "Activo",
        role: "Moderador",
    },
]

function ManagementUser() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<UserType[]>([])
    const [error, setError] = useState<string | null>(null)

    // Cargar usuarios al montar el componente
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const usersData = await getUsers()
            setUsers(usersData)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar los usuarios')
            console.error("Error details:", err)
        } finally {
            setLoading(false)
        }
    }

    const [searchTerm, setSearchTerm] = useState("")
    const [subscriptionFilter, setSubscriptionFilter] = useState("all")

    // Filtrar usuarios basado en búsqueda y filtro de suscripción
    const filteredUsers = useMemo(() => {
        return mockUsers.filter((user) => {
            const matchesSearch =
                user.cc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesSubscription =
                subscriptionFilter === "all" || user.subscription.toLowerCase() === subscriptionFilter.toLowerCase()

            return matchesSearch && matchesSubscription
        })
    }, [searchTerm, subscriptionFilter])

    const handleEdit = (userId: number) => {
        console.log("[v0] Editando usuario:", userId)
        // Aquí se implementaría la lógica de edición
    }

    const handleDelete = (userId: number) => {
        console.log("[v0] Eliminando usuario:", userId)
        // Aquí se implementaría la lógica de eliminación
    }

    const getStatusBadge = (status: string) => {
        const statusColors = {
            Activo: "bg-green-100 text-green-800 border-green-200",
            Inactivo: "bg-gray-100 text-gray-800 border-gray-200",
            Suspendido: "bg-red-100 text-red-800 border-red-200",
        }
        return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
    }

    const getRoleBadge = (role: string) => {
        const roleColors = {
            Administrador: "bg-purple-100 text-purple-800 border-purple-200",
            Moderador: "bg-blue-100 text-blue-800 border-blue-200",
            Usuario: "bg-green-100 text-green-800 border-green-200",
        }
        return roleColors[role as keyof typeof roleColors] || "bg-gray-100 text-gray-800"
    }

    return (
        <div className="flex-1 p-8 bg-gradient-to-br from-green-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">Gestión de Usuarios</h1>
                    <p className="text-green-600">Administra y supervisa todos los usuarios registrados en EcoMove</p>
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
                                        placeholder="Buscar por CC, nombre o email..."
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
                                        <SelectItem value="básico">Básico</SelectItem>
                                        <SelectItem value="estándar">Estándar</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla de usuarios */}
                <Card className="border-green-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-green-800">Usuarios Registrados ({filteredUsers.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-green-200">
                                        <TableHead className="text-green-700 font-semibold">CC</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Nombre Completo</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Email</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Suscripción</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Estado</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Rol</TableHead>
                                        <TableHead className="text-green-700 font-semibold text-center">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id} className="border-green-100 hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{user.cc}</TableCell>
                                            <TableCell className="text-green-700">{user.fullName}</TableCell>
                                            <TableCell className="text-green-600">{user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    {user.subscription}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={getStatusBadge(user.status)}>
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={getRoleBadge(user.role)}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(user.id)}
                                                        className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(user.id)}
                                                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
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