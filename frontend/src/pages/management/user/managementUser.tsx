import { useState } from "react"
import { User, Search, Plus, Edit, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import ModalRegisterUser from "./modalRegisterUser"

interface UserData {
    id: string
    fullName: string
    subscription: string
    email: string
    cc: string
}

const mockUsers: UserData[] = [
    {
        id: "1",
        fullName: "Juan Pérez",
        subscription: "Premium",
        email: "juan.perez@email.com",
        cc: "****1234",
    },
    {
        id: "2",
        fullName: "María García",
        subscription: "Basic",
        email: "maria.garcia@email.com",
        cc: "****5678",
    },
    {
        id: "3",
        fullName: "Carlos López",
        subscription: "Premium",
        email: "carlos.lopez@email.com",
        cc: "****9012",
    },
    {
        id: "4",
        fullName: "Ana Martínez",
        subscription: "Standard",
        email: "ana.martinez@email.com",
        cc: "****3456",
    },
    {
        id: "5",
        fullName: "Luis Rodríguez",
        subscription: "Basic",
        email: "luis.rodriguez@email.com",
        cc: "****7890",
    },
    {
        id: "6",
        fullName: "Sofia Hernández",
        subscription: "Premium",
        email: "sofia.hernandez@email.com",
        cc: "****2468",
    },
]

function ManagementUser() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterSubscription, setFilterSubscription] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [users, setUsers] = useState<UserData[]>(mockUsers)

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterSubscription === "all" || user.subscription === filterSubscription
        return matchesSearch && matchesFilter
    })

    const handleRegister = (newUser: { cc: string; name: string; email: string; subscription: string }) => {
        const userToAdd: UserData = {
            id: String(users.length + 1),
            fullName: newUser.name,
            subscription: newUser.subscription,
            email: newUser.email,
            cc: newUser.cc,
        }
        setUsers([...users, userToAdd])
    }

    const handleEdit = (userId: string) => {
        console.log("Edit user:", userId)
    }

    const handleDelete = (userId: string) => {
        console.log("Delete user:", userId)
    }

    const getSubscriptionColor = (subscription: string) => {
        switch (subscription) {
            case "Premium":
                return "bg-green-100 text-green-800"
            case "Standard":
                return "bg-yellow-100 text-yellow-800"
            case "Basic":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <><div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-green-800">User Management</h1>
                    <p className="text-gray-600">Manage and view all registered users</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New User
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">{mockUsers.length}</p>
                            </div>
                            <User className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Premium Users</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {mockUsers.filter((u) => u.subscription === "Premium").length}
                                </p>
                            </div>
                            <User className="w-8 h-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Standard Users</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {mockUsers.filter((u) => u.subscription === "Standard").length}
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
                                <p className="text-sm font-medium text-gray-600">Basic Users</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {mockUsers.filter((u) => u.subscription === "Basic").length}
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
                        placeholder="Search users by name or email..."
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
                        <option value="all">All Subscriptions</option>
                        <option value="Premium">Premium</option>
                        <option value="Standard">Standard</option>
                        <option value="Basic">Basic</option>
                    </select>
                </div>
            </div>

            {/* User Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200">
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
                                        <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subscription</p>
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSubscriptionColor(user.subscription)}`}
                                        >
                                            {user.subscription}
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
                                    onClick={() => handleEdit(user.id)}
                                    className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                                >
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
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
                            : "Get started by adding your first user."}
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add First User
                    </Button>
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