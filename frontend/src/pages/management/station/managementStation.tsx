"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Plus, MapPin } from "lucide-react"
import RegisterStation from "@/components/modals/station/modalCreateStation" // Importar el modal

// Datos de ejemplo para las estaciones
const mockStations = [
    {
        id: "EST001",
        nombre: "Estación Zona Rosa",
        direccion: "Calle 72 #10-34, Bogotá",
        latitud: 4.6533,
        longitud: -74.0836,
    },
    {
        id: "EST002",
        nombre: "Estación Chicó Norte",
        direccion: "Carrera 15 #93-47, Bogotá",
        latitud: 4.6762,
        longitud: -74.0482,
    },
    {
        id: "EST003",
        nombre: "Estación Ciudad Salitre",
        direccion: "Avenida 68 #24-35, Bogotá",
        latitud: 4.628,
        longitud: -74.1027,
    },
    {
        id: "EST004",
        nombre: "Estación Corferias",
        direccion: "Calle 26 #69-76, Bogotá",
        latitud: 4.6097,
        longitud: -74.0817,
    },
    {
        id: "EST005",
        nombre: "Estación La Candelaria",
        direccion: "Carrera 7 #32-16, Bogotá",
        latitud: 4.6198,
        longitud: -74.0651,
    },
    {
        id: "EST006",
        nombre: "Estación Cedritos",
        direccion: "Calle 116 #7-15, Bogotá",
        latitud: 4.6946,
        longitud: -74.0312,
    },
    {
        id: "EST007",
        nombre: "Estación Engativá",
        direccion: "Avenida Boyacá #72-81, Bogotá",
        latitud: 4.6533,
        longitud: -74.1205,
    },
    {
        id: "EST008",
        nombre: "Estación Teusaquillo",
        direccion: "Carrera 30 #45-67, Bogotá",
        latitud: 4.6351,
        longitud: -74.0703,
    },
]

export function ManagementStation() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar el modal
    const [refreshTrigger, setRefreshTrigger] = useState(0) // Para refrescar la lista después de crear

    // Filtrar estaciones basado en la búsqueda
    // Filtrar estaciones basado en la búsqueda
    const filteredStations = useMemo(() => {
        if (!searchTerm) return mockStations

        return mockStations.filter(
            (station) =>
                station.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                station.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                station.direccion.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [searchTerm, refreshTrigger]) // Añadimos refreshTrigger como dependencia

    const handleEdit = (stationId: string) => {
        console.log("[v0] Editando estación:", stationId)
        // Aquí iría la lógica para editar la estación
    }

    const handleDelete = (stationId: string) => {
        console.log("[v0] Eliminando estación:", stationId)
        // Aquí iría la lógica para eliminar la estación
    }

    const handleAddStation = () => {
        setIsModalOpen(true) // Abrir el modal
    }

    const handleModalClose = () => {
        setIsModalOpen(false) // Cerrar el modal
    }

    const handleStationCreated = () => {
        setIsModalOpen(false) // Cerrar el modal después de crear
        setRefreshTrigger(prev => prev + 1) // Forzar recarga de la lista
        console.log("Estación creada exitosamente, refrescando lista...")
        // Aquí podrías hacer una llamada a tu API para obtener las estaciones actualizadas
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
                    <Button onClick={handleAddStation} className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Estación
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
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-2">Buscar Estación</label>
                                <Input
                                    placeholder="Buscar por ID o dirección..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border-green-200 focus:border-green-500"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla de Estaciones */}
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
                                        <TableHead className="text-green-700 font-semibold">Nombre de Estación</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Dirección</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Latitud</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Longitud</TableHead>
                                        <TableHead className="text-green-700 font-semibold text-center">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStations.map((station) => (
                                        <TableRow key={station.id} className="hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{station.id}</TableCell>
                                            <TableCell className="text-gray-700">{station.nombre}</TableCell>
                                            <TableCell className="text-gray-700">{station.direccion}</TableCell>
                                            <TableCell className="text-gray-700">{station.latitud.toFixed(4)}</TableCell>
                                            <TableCell className="text-gray-700">{station.longitud.toFixed(4)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(station.id)}
                                                        className="border-green-200 text-green-600 hover:bg-green-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(station.id)}
                                                        className="border-red-200 text-red-600 hover:bg-red-50"
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

                        {filteredStations.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No se encontraron estaciones que coincidan con la búsqueda.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Modal para crear estación */}
                <RegisterStation
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSuccess={handleStationCreated}
                />
            </div>
        </div>
    )
}