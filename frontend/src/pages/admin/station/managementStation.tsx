"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, MapPin, RefreshCw } from "lucide-react"
import RegisterStation from "@/pages/admin/station/modals/modalCreateStation"
import { useManagementStation } from "@/hooks/station/useManagementStation"

export function ManagementStation() {
    const {
        filteredStations,
        searchTerm,
        setSearchTerm,
        isModalOpen,
        setIsModalOpen,
        handleStationCreated,
        loading,
        error,
        fetchStations,
    } = useManagementStation()

    if (loading) {
        return (
            <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <MapPin className="h-12 w-12 text-green-500 animate-pulse mx-auto mb-4" />
                    <p className="text-green-600">Cargando estaciones...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 mb-2">Error al cargar las estaciones</p>
                    <p className="text-red-500 text-sm mb-4">{error}</p>

                    <Button
                        onClick={fetchStations}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reintentar
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
                            <MapPin className="h-8 w-8" />
                            Gestión de Estaciones
                        </h1>
                        <p className="text-green-600 mt-2">Administra las estaciones de EcoMove en toda la ciudad</p>
                    </div>

                    <Button
                        onClick={fetchStations}
                        variant="outline"
                        className="border-green-300 text-green-700"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Actualizar
                    </Button>
                </div>

                {/* Búsqueda */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-green-800 flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Búsqueda
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    Buscar Estación
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                                    <Input
                                        placeholder="Buscar por ID, nombre o dirección..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-green-200"
                                    />
                                </div>
                            </div>

                            {/* Botón Agregar */}
                            <div className="w-full md:w-auto flex items-end">
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Agregar Estación
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-green-800">Estaciones Registradas ({filteredStations.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-green-700 font-semibold">ID</TableHead>
                                        <TableHead className="text-green-700 font-semibold">NOMBRE</TableHead>
                                        <TableHead className="text-green-700 font-semibold">DIRECCIÓN</TableHead>
                                        <TableHead className="text-green-700 font-semibold">LATITUD</TableHead>
                                        <TableHead className="text-green-700 font-semibold">LONGITUD</TableHead>
                                        <TableHead className="text-green-700 font-semibold">FECHA DE REGISTRO</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredStations.map((station) => (
                                        <TableRow key={station.idStation} className="hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{station.idStation}</TableCell>
                                            <TableCell className="text-gray-700">{station.name}</TableCell>
                                            <TableCell className="text-gray-700">{station.address}</TableCell>
                                            <TableCell className="text-gray-700">{station.geoLocation.latitude.toFixed(4)}</TableCell>
                                            <TableCell className="text-gray-700">{station.geoLocation.longitude.toFixed(4)}</TableCell>
                                            <TableCell className="text-gray-700">{station.geoLocation.timestamp instanceof Date ? station.geoLocation.timestamp.toLocaleString() : station.geoLocation.timestamp}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {filteredStations.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No se encontraron estaciones que coincidan con la búsqueda.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Modal */}
                <RegisterStation
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleStationCreated}
                />
            </div>
        </div>
    )
}
