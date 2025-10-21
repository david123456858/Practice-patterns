"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Car, Filter, Plus, RefreshCw } from "lucide-react"
import { AddVehicleModal } from "@/components/modals/vehicle/modalCreateVehicle"
import { getAllVehicles, type Vehicle } from "@/services/vehicle/getAllVehicle"

function ManagementVehicle() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Cargar vehículos al montar el componente
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true)
                const data = await getAllVehicles()
                setVehicles(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error al cargar los vehículos")
                console.error("Error fetching vehicles:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchVehicles()
    }, [])

    // Filtrar vehículos basado en búsqueda y filtro de estado
    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle) => {
            const matchesSearch =
                vehicle.idVehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.idStation.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || vehicle.state === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [searchTerm, statusFilter, vehicles])

    const getStatusBadge = (estado: string) => {
        switch (estado) {
            case "AVAILABLE":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Disponible</Badge>
            case "IN_USE":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En uso</Badge>
            case "MAINTENANCE":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Mantenimiento</Badge>
            case "OUT_OF_SERVICE":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Fuera de servicio</Badge>
            default:
                return <Badge variant="secondary">{estado}</Badge>
        }
    }

    const handleAddVehicle = () => {
        setIsModalOpen(true)
    }

    const handleRefresh = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await getAllVehicles()
            setVehicles(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al actualizar los vehículos")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex-1 p-8 bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <Car className="h-12 w-12 text-green-500 animate-pulse mx-auto mb-4" />
                    <p className="text-green-600">Cargando vehículos...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex-1 p-8 bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <Car className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 mb-2">Error al cargar los vehículos</p>
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                    <Button onClick={handleRefresh} className="bg-green-600 hover:bg-green-700">
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
                        <h1 className="text-3xl font-bold text-green-800">Gestión de Vehículos</h1>
                        <p className="text-green-600 mt-1">Administra la flota de vehículos eléctricos</p>
                    </div>
                    <Button onClick={handleRefresh} variant="outline" className="border-green-300 text-green-700">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Actualizar
                    </Button>
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
                                        <SelectItem value="AVAILABLE">Disponible</SelectItem>
                                        <SelectItem value="IN_USE">En uso</SelectItem>
                                        <SelectItem value="MAINTENANCE">Mantenimiento</SelectItem>
                                        <SelectItem value="OUT_OF_SERVICE">Fuera de servicio</SelectItem>
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
                            <CardTitle className="text-green-800 text-lg">
                                Vehículos Registrados ({filteredVehicles.length})
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-green-200">
                                        <TableHead className="text-green-700 font-semibold">ID</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Modelo</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Color</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Tipo</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Estación</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Costo/min</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Estado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredVehicles.map((vehicle) => (
                                        <TableRow key={vehicle.idVehicle} className="border-green-100 hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{vehicle.idVehicle}</TableCell>
                                            <TableCell className="text-gray-700">{vehicle.model}</TableCell>
                                            <TableCell className="text-gray-700">{vehicle.color}</TableCell>
                                            <TableCell className="text-gray-700 capitalize">{vehicle.type}</TableCell>
                                            <TableCell className="text-gray-700">{vehicle.nameStation}</TableCell>
                                            <TableCell className="text-gray-700">${vehicle.costForMinute.toLocaleString()}</TableCell>
                                            <TableCell>{getStatusBadge(vehicle.state)}</TableCell>
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
            <AddVehicleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default ManagementVehicle;