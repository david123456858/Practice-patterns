import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Car, Filter, Plus } from "lucide-react"

// Datos de ejemplo para los vehículos
const mockVehicles = [
    {
        id: "VH001",
        estacion: "Estación Centro",
        costo: 15000,
        modelo: "Tesla Model 3",
        estado: "Disponible",
    },
    {
        id: "VH002",
        estacion: "Estación Norte",
        costo: 18000,
        modelo: "Nissan Leaf",
        estado: "En uso",
    },
    {
        id: "VH003",
        estacion: "Estación Sur",
        costo: 12000,
        modelo: "BMW i3",
        estado: "Mantenimiento",
    },
    {
        id: "VH004",
        estacion: "Estación Centro",
        costo: 20000,
        modelo: "Audi e-tron",
        estado: "Disponible",
    },
    {
        id: "VH005",
        estacion: "Estación Este",
        costo: 16000,
        modelo: "Hyundai Kona Electric",
        estado: "En uso",
    },
    {
        id: "VH006",
        estacion: "Estación Oeste",
        costo: 14000,
        modelo: "Chevrolet Bolt",
        estado: "Disponible",
    },
    {
        id: "VH007",
        estacion: "Estación Norte",
        costo: 22000,
        modelo: "Mercedes EQC",
        estado: "Mantenimiento",
    },
    {
        id: "VH008",
        estacion: "Estación Sur",
        costo: 17000,
        modelo: "Volkswagen ID.4",
        estado: "Disponible",
    },
]

function ManagementVehicle() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filtrar vehículos basado en búsqueda y filtro de estado
    const filteredVehicles = useMemo(() => {
        return mockVehicles.filter((vehicle) => {
            const matchesSearch =
                vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.estacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || vehicle.estado === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [searchTerm, statusFilter])

    const getStatusBadge = (estado: string) => {
        switch (estado) {
            case "Disponible":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Disponible</Badge>
            case "En uso":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En uso</Badge>
            case "Mantenimiento":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Mantenimiento</Badge>
            default:
                return <Badge variant="secondary">{estado}</Badge>
        }
    }

    const handleEdit = (vehicleId: string) => {
        console.log("[v0] Editando vehículo:", vehicleId)
        // Aquí iría la lógica para editar el vehículo
    }

    const handleDelete = (vehicleId: string) => {
        console.log("[v0] Eliminando vehículo:", vehicleId)
        // Aquí iría la lógica para eliminar el vehículo
    }

    const handleAddVehicle = () => {
        console.log("[v0] Agregando nuevo vehículo")
        // Aquí iría la lógica para agregar un nuevo vehículo
    }

    return (
        <div className="flex-1 p-8 bg-gradient-to-br from-green-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-green-800">Gestión de Vehículos</h1>
                        <p className="text-green-600 mt-1">Administra la flota de vehículos eléctricos</p>
                    </div>
                </div>

                {/* Filtros y búsqueda */}
                <Card className="mb-6 border-green-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-green-800 text-lg flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filtros y Búsqueda
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Buscador */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-green-700 mb-2">Buscar Vehículo</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                                    <Input
                                        placeholder="Buscar por ID, Estación o Modelo..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            {/* Filtro por estado */}
                            <div className="w-full md:w-48">
                                <label className="block text-sm font-medium text-green-700 mb-2">Filtrar por Estado</label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                                        <SelectValue placeholder="Filtrar por estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todos los estados</SelectItem>
                                        <SelectItem value="Disponible">Disponible</SelectItem>
                                        <SelectItem value="En uso">En uso</SelectItem>
                                        <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full md:w-auto flex items-end">
                                <Button
                                    onClick={handleAddVehicle}
                                    className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Agregar Vehículo
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla de vehículos */}
                <Card className="border-green-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-green-800 text-lg">Vehículos Registrados ({filteredVehicles.length})</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-green-200">
                                        <TableHead className="text-green-700 font-semibold">ID</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Estación</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Costo</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Modelo</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Estado</TableHead>
                                        <TableHead className="text-green-700 font-semibold text-center">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredVehicles.map((vehicle) => (
                                        <TableRow key={vehicle.id} className="border-green-100 hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{vehicle.id}</TableCell>
                                            <TableCell className="text-gray-700">{vehicle.estacion}</TableCell>
                                            <TableCell className="text-gray-700">${vehicle.costo.toLocaleString()}</TableCell>
                                            <TableCell className="text-gray-700">{vehicle.modelo}</TableCell>
                                            <TableCell>{getStatusBadge(vehicle.estado)}</TableCell>
                                            <TableCell>
                                                <div className="flex justify-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(vehicle.id)}
                                                        className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(vehicle.id)}
                                                        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {filteredVehicles.length === 0 && (
                                <div className="text-center py-8">
                                    <Car className="h-12 w-12 text-green-300 mx-auto mb-4" />
                                    <p className="text-green-600 text-lg">No se encontraron vehículos</p>
                                    <p className="text-green-500 text-sm">Intenta ajustar los filtros de búsqueda</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ManagementVehicle;