"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Car, Filter, Plus, RefreshCw } from "lucide-react"
import { useManagementVehicle } from "@/hooks/vehicle/useManagementVehicle"

import AddVehicleModal from "./modals/modalCreateVehicle"

function ManagementVehicle() {
    const {
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        isModalOpen,
        setIsModalOpen,
        filteredVehicles,
        loading,
        error,
        fetchVehicles,
        getStatusBadge,
    } = useManagementVehicle()

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
                    <Button onClick={fetchVehicles} className="bg-green-600 hover:bg-green-700">
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
                        <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
                            <Car className="h-8 w-8" />
                            Gestión de Vehículos</h1>
                        <p className="text-green-600 mt-1">Administra la flota de vehículos eléctricos</p>
                    </div>

                    <Button
                        onClick={fetchVehicles}
                        variant="outline"
                        className="border-green-300 text-green-700"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Actualizar
                    </Button>
                </div>

                {/* Filtros */}
                <Card className="mb-6 border-green-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-green-800 text-lg flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filtros y Búsqueda
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-green-700 mb-2">Buscar Vehículo</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                                    <Input
                                        placeholder="Buscar por ID, estación o modelo..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-green-200"
                                    />
                                </div>
                            </div>

                            {/* Estado */}
                            <div className="w-full md:w-48">
                                <label className="block text-sm font-medium text-green-700 mb-2">Estado</label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="border-green-200">
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

                            {/* Botón Agregar */}
                            <div className="w-full md:w-auto flex items-end">
                                <Button
                                    onClick={() => setIsModalOpen(true)}
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
                        <div className="overflow-x-auto max-h-105 overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-green-200">
                                        <TableHead className="text-green-700 font-semibold">ID</TableHead>
                                        <TableHead className="text-green-700 font-semibold">MODELO</TableHead>
                                        <TableHead className="text-green-700 font-semibold">COLOR</TableHead>
                                        <TableHead className="text-green-700 font-semibold">TIPO</TableHead>
                                        <TableHead className="text-green-700 font-semibold">COSTO/MIN</TableHead>
                                        <TableHead className="text-green-700 font-semibold">ESTADO</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredVehicles.map((vehicle) => (
                                        <TableRow key={vehicle.idVehicle} className="border-green-100 hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{vehicle.idVehicle}</TableCell>
                                            <TableCell className="text-gray-700">{vehicle.model}</TableCell>
                                            <TableCell className="text-gray-700">{vehicle.color}</TableCell>
                                            <TableCell className="text-gray-700 capitalize">{vehicle.type}</TableCell>
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