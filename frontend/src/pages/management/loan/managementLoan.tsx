"use client"

import { useEffect, useState } from "react"
import { Search, Filter, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLoans, type Loan } from "@/services/loan/getAllLoan"

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

    // Filtrar préstamos
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
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Usuario</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Vehículo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Inicio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Entrega</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Estación Inicio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Estación Entrega</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Costo</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLoans.map((loan) => (
                                    <tr key={loan.loanId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{loan.loanId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{loan.userId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{loan.vehicleId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{formatDateTime(loan.startTime)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{formatDateTime(loan.endTime)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{loan.startStationId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {loan.endStationId ?? "No se ha entregado"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                                                {loan.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(loan.cost)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredLoans.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No se encontraron préstamos que coincidan con los criterios.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
