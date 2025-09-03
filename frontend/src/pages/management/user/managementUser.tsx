import { useState, useEffect } from "react"
import { User, Search, Plus, Edit, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import ModalRegisterUser from "./modalRegisterUser"
import { getUsers } from "@/services/user/userServices"
import type { User as UserType } from "@/types/classes/user"
import { TypesPricePeriods } from "@/types/enums/TypesPricePeriods"

function ManagementUser() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterSubscription, setFilterSubscription] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [users, setUsers] = useState<UserType[]>([])
    const [loading, setLoading] = useState(true)
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

    const handleRegister = async (userData: {
        cc: string;
        name: string;
        email: string;
        suscriptionId: string;
    }) => {
        try {
            // En una implementación real, usarías el servicio createUser:
            // const newUser = await createUser(userData);

            // Por ahora simulamos la creación localmente
            const newUser: UserType = {
                cc: userData.cc,
                name: userData.name,
                email: userData.email,
                subscription: userData.suscriptionId // CORRECCIÓN: usar "suscription" en lugar de "subscription"
            }

            setUsers(prev => [...prev, newUser]);

            // Mostrar mensaje de éxito
            console.log("User created successfully:", newUser);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error creating user');
            console.error(err);
        }
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.cc.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = filterSubscription === "all"

        return matchesSearch && matchesFilter
    })

    const getSubscriptionType = (user: UserType) => {
        if (!user.subscription) return "No subscription"
        return "With subscription"
    }

    const getSubscriptionColor = (user: UserType) => {
        const subscriptionType = getSubscriptionType(user)
        switch (subscriptionType) {
            case "With subscription":
                return "bg-green-100 text-green-800"
            case "No subscription":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    //Si el fetch se encuentra funcionando, mostrara una pantalla de carga.
    if (loading) {
        return (
            <div className="space-y-6 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-green-800">User Management</h1>
                        <p className="text-gray-600">Manage and view all registered users</p>
                    </div>
                </div>
                <div className="text-center py-12">
                    <p>Loading users...</p>
                </div>
            </div>
        )
    }

    //Mostramos mensaje en pantalla si los usuarios no se loraron cargar por medio del fetch.
    if (error) {
        return (
            <div className="space-y-6 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-green-800">User Management</h1>
                        <p className="text-gray-600">Manage and view all registered users</p>
                    </div>
                </div>
                <div className="text-center py-12 text-red-500">
                    <p>Error: {error}</p>
                    <Button onClick={fetchUsers} className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    //Contenido original
    return (
        <><div className="space-y-6">

            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-green-800">User Management</h1>
                    <p className="text-gray-600">Manage and view all registered users</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New User
                </Button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                            </div>
                            <User className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">With Subscription</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.filter(user => user.subscription === null).length}
                                </p>
                            </div>
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-gray-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Without Subscription</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.filter(user => user.subscription !== null).length}
                                </p>
                            </div>
                            <User className="w-8 h-8 text-gray-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search users by name, email or CC..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                        value={filterSubscription}
                        onChange={(e) => setFilterSubscription(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="all">All Users</option>
                        <option value="with">With Subscription</option>
                        <option value="without">Without Subscription</option>
                    </select>
                </div>
            </div>

            {/* User Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <Card key={user.cc} className="hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-6">
                            {/* User Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-gray-600" />
                                </div>
                            </div>

                            {/* User Information */}
                            <div className="space-y-3 mb-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</p>
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subscription</p>
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSubscriptionColor(user)}`}
                                        >
                                            {getSubscriptionType(user)}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                                        <p className="text-sm text-gray-900 truncate">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">CC</p>
                                        <p className="text-sm text-gray-900">{user.cc}</p>
                                    </div>
                                </div>
                            </div>


                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => console.log("Edit user:", user.cc)}
                                    className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                                >
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => console.log("Delete user:", user.cc)}
                                    className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-500 mb-4">
                        {searchTerm || filterSubscription !== "all"
                            ? "Try adjusting your search or filter criteria."
                            : "No users registered yet."}
                    </p>
                </div>
            )}
        </div>

            {/* Modal de Registro */}
            <ModalRegisterUser
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRegister={handleRegister}
            />
        </>
    )
}

export default ManagementUser