"use client"

import { useEffect, useState } from "react"
import { Search, Filter, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getLoans } from "@/services/loan/loan"
import { type Loan } from "@/interface/loan/loan"

export default function ManagementLoan() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [loans, setLoans] = useState<Loan[]>([])
    const [loading, setLoading] = useState(false)

    const fetchLoans = async () => {
        try {
            setLoading(true)
            const data = await getLoans()
            setLoans(data)
        } catch (error) {
            console.error("Error cargando préstamos:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const data = await getLoans()
                setLoans(data)
            } catch (error) {
                console.error("Error cargando préstamos:", error)
            }
        }
        fetchLoans()
    }, [])

    const filteredLoans = loans.filter((loan) => {
        const matchesSearch =
            loan.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.vehicleId.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || loan.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-100 text-green-800"
            case "COMPLETED":
                return "bg-blue-100 text-blue-800"
            case "CANCELED":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div className="flex-1 p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-green-800 mb-2">Gestión de Préstamos</h1>
                        <p className="text-green-600">Visualiza todos los prestamos que se han sido registrados</p>

                    </div>

                    <Button
                        onClick={fetchLoans}
                        disabled={loading}
                        variant="outline" className="border-green-300 text-green-700"
                    >
                        <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        {loading ? "Actualizando..." : "Actualizar"}
                    </Button>
                </div>


                {/* Filtros y Búsqueda */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="h-5 w-5 text-green-600" />
                        <h2 className="text-lg font-semibold text-green-800">Filtros y Búsqueda</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Préstamo</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder="Buscar por ID préstamo, usuario o vehículo..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Estado</label>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    <SelectItem value="ACTIVE">Activo</SelectItem>
                                    <SelectItem value="COMPLETED">Completado</SelectItem>
                                    <SelectItem value="CANCELED">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

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
