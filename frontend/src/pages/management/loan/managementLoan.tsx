import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, MapPin, Clock, User, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Loan {
    id: string
    nameUser: string
    nameVehicle: string
    stationOrigin: string
    stationDestine: string
    duration: string
    status: "active" | "completed" | "pending"
    startDate: string
}

const mockLoans: Loan[] = [
    {
        id: "1",
        nameUser: "Carlos Rodriguez",
        nameVehicle: "EcoBike Pro 001",
        stationOrigin: "Central Station",
        stationDestine: "Park Station",
        duration: "2h 30m",
        status: "active",
        startDate: "2024-01-15",
    },
    {
        id: "2",
        nameUser: "Maria Garcia",
        nameVehicle: "EcoScooter X2",
        stationOrigin: "Mall Station",
        stationDestine: "University Station",
        duration: "1h 45m",
        status: "completed",
        startDate: "2024-01-14",
    },
    {
        id: "3",
        nameUser: "Juan Martinez",
        nameVehicle: "EcoBike Lite 003",
        stationOrigin: "Airport Station",
        stationDestine: "Downtown Station",
        duration: "3h 15m",
        status: "pending",
        startDate: "2024-01-16",
    },
]

function ManagementLoan() {
    const [loans] = useState<Loan[]>(mockLoans)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const filteredLoans = loans.filter((loan) => {
        const matchesSearch =
            loan.nameUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.nameVehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.stationOrigin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.stationDestine.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || loan.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const totalPages = Math.ceil(filteredLoans.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedLoans = filteredLoans.slice(startIndex, startIndex + itemsPerPage)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 border-green-200"
            case "completed":
                return "bg-gray-100 text-gray-800 border-gray-200"
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "active":
                return "Activo"
            case "completed":
                return "Completado"
            case "pending":
                return "Pendiente"
            default:
                return status
        }
    }

    return (
        <><div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-green-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Préstamos</CardTitle>
                        <Car className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">{loans.length}</div>
                        <p className="text-xs text-gray-500">Todos los préstamos</p>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Préstamos Activos</CardTitle>
                        <Clock className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">{loans.filter((l) => l.status === "active").length}</div>
                        <p className="text-xs text-gray-500">En curso</p>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Completados Hoy</CardTitle>
                        <User className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">
                            {loans.filter((l) => l.status === "completed").length}
                        </div>
                        <p className="text-xs text-gray-500">Finalizados</p>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
                        <MapPin className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">
                            {loans.filter((l) => l.status === "pending").length}
                        </div>
                        <p className="text-xs text-gray-500">Por procesar</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Card */}
            <Card className="border-green-200 bg-white">
                <CardHeader className="">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle className="text-2xl font-bold text-green-800">Gestión de Préstamos</CardTitle>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Nuevo Préstamo
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Buscar por usuario, vehículo o estación..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                            />
                        </div>

                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="active">Activos</option>
                                <option value="completed">Completados</option>
                                <option value="pending">Pendientes</option>
                            </select>

                            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent">
                                <Filter className="w-4 h-4 mr-2" />
                                Filtros
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-green-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name User</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name Vehicle</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Station Origin</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Station Destine</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedLoans.length > 0 ? (
                                    paginatedLoans.map((loan) => (
                                        <tr key={loan.id} className="border-b border-gray-100 hover:bg-green-50 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <User className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-900">{loan.nameUser}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Car className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-700">{loan.nameVehicle}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-700">{loan.stationOrigin}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-yellow-600" />
                                                    <span className="text-gray-700">{loan.stationDestine}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-700">{loan.duration}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge className={getStatusColor(loan.status)}>{getStatusText(loan.status)}</Badge>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Car className="w-8 h-8 text-green-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay préstamos registrados</h3>
                                                    <p className="text-gray-500 mb-4">Comienza agregando tu primer préstamo de vehículo</p>
                                                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Agregar Primer Préstamo
                                                    </Button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-500">
                                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredLoans.length)} de{" "}
                                {filteredLoans.length} préstamos
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="border-green-200 text-green-700 hover:bg-green-50"
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="border-green-200 text-green-700 hover:bg-green-50"
                                >
                                    Siguiente
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div> </>
    )
}

export default ManagementLoan