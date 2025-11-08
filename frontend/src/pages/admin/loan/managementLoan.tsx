"use client"

import { Search, RefreshCcw, FileWarning, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useManagementLoan } from "@/hooks/loan/useManagementLoan"

export default function ManagementLoan() {
    const {
        filteredLoans,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        fetchLoans,
        getStatusColor,
        formatDateTime,
        formatCurrency,
    } = useManagementLoan()

    if (loading) {
        return (
            <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCcw className="h-12 w-12 text-green-500 animate-spin mx-auto mb-4" />
                    <p className="text-green-600">Cargando préstamos...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FileWarning className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 mb-2">Error al cargar los préstamos</p>
                    <p className="text-red-500 text-sm mb-4">{error}</p>

                    <Button
                        onClick={fetchLoans}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        <RefreshCcw className="h-4 w-4 mr-2" />
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
                            <FileText className="h-8 w-8" />
                            Gestión de Préstamos</h1>
                        <p className="text-green-600">Visualiza todos los préstamos registrados</p>
                    </div>

                    <Button
                        onClick={fetchLoans}
                        disabled={loading}
                        variant="outline"
                        className="border-green-300 text-green-700"
                    >
                        <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        {loading ? "Actualizando..." : "Actualizar"}
                    </Button>
                </div>

                {/* Filtros y búsqueda */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-green-800 flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Filtros y búsqueda
                        </CardTitle>
                    </CardHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CardContent>
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    Buscar Préstamo
                                </label>

                                <Input
                                    type="text"
                                    placeholder="Buscar por ID, usuario o vehículo..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-4 border-green-200"
                                />
                            </div>
                        </CardContent>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="border-green-200">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="ACTIVE">Activo</SelectItem>
                                    <SelectItem value="COMPLETED">Completado</SelectItem>
                                    <SelectItem value="CANCELED">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>

                {/* Tabla de Préstamos */}
                <Card className="border-green-200 shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg text-green-800">
                                Préstamos Registrados ({filteredLoans.length})
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-green-200">
                                        <TableHead className="text-green-700 font-semibold">ID</TableHead>
                                        <TableHead className="text-green-700 font-semibold">USUARIO</TableHead>
                                        <TableHead className="text-green-700 font-semibold">VEHÍCULO</TableHead>
                                        <TableHead className="text-green-700 font-semibold">FECHA INICIO</TableHead>
                                        <TableHead className="text-green-700 font-semibold">FECHA ENTREGA</TableHead>
                                        <TableHead className="text-green-700 font-semibold">ESTACIÓN INICIO</TableHead>
                                        <TableHead className="text-green-700 font-semibold">ESTACIÓN ENTREGA</TableHead>
                                        <TableHead className="text-green-700 font-semibold">ESTADO</TableHead>
                                        <TableHead className="text-green-700 font-semibold">COSTO</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredLoans.map((loan) => (
                                        <TableRow key={loan.loanId} className="border-green-100 hover:bg-green-50">
                                            <TableCell className="font-medium text-green-800">{loan.loanId}</TableCell>
                                            <TableCell className="text-green-700">{loan.userId}</TableCell>
                                            <TableCell className="text-green-700">{loan.vehicleId}</TableCell>
                                            <TableCell className="text-green-700">{formatDateTime(loan.startTime)}</TableCell>
                                            <TableCell className="text-green-700">{formatDateTime(loan.endTime)}</TableCell>
                                            <TableCell className="text-green-700">{loan.startStationId}</TableCell>
                                            <TableCell className="text-green-700">
                                                {loan.endStationId ?? "Central Park Station"}
                                            </TableCell>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                                                    {loan.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(loan.cost)}</td>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {filteredLoans.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No se encontraron préstamos que coincidan con los criterios.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
