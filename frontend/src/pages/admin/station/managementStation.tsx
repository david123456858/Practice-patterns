"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, MapPin } from "lucide-react"
import RegisterStation from "@/pages/admin/station/modals/modalCreateStation"
import { getStations, type Station } from "@/services/station/station"

export function ManagementStation() {
    const [stations, setStations] = useState<Station[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    // Traer estaciones desde el servicio
    useEffect(() => {
        const fetchStations = async () => {
            const data = await getStations()
            setStations(data)
        }
        fetchStations()
    }, [refreshTrigger])

    const filteredStations = useMemo(() => {
        if (!searchTerm) return stations
        return stations.filter(
            (station) =>
                station.idStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                station.nameStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                station.address.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [searchTerm, stations])

    const handleAddStation = () => setIsModalOpen(true)
    const handleModalClose = () => setIsModalOpen(false)
    const handleStationCreated = () => {
        setIsModalOpen(false)
        setRefreshTrigger(prev => prev + 1)
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
                            <label className="block text-sm font-medium text-green-700 mb-2">Buscar Estación</label>
                            <Input
                                placeholder="Buscar por ID, nombre o dirección..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-green-200 focus:border-green-500"
                            />
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
                                        <TableHead className="text-green-700 font-semibold">Nombre</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Dirección</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Latitud</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Longitud</TableHead>
                                        <TableHead className="text-green-700 font-semibold">Actualizado</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredStations.map((station) => (
                                        <TableRow key={station.idStation} className="hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{station.idStation}</TableCell>
                                            <TableCell className="text-gray-700">{station.nameStation}</TableCell>
                                            <TableCell className="text-gray-700">{station.address}</TableCell>
                                            <TableCell className="text-gray-700">{station.geoLocation.latitude.toFixed(4)}</TableCell>
                                            <TableCell className="text-gray-700">{station.geoLocation.longitude.toFixed(4)}</TableCell>
                                            <TableCell className="text-gray-700">{station.locationTimestamp}</TableCell>
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
                    onClose={handleModalClose}
                    onSuccess={handleStationCreated}
                />
            </div>
        </div>
    )
}
