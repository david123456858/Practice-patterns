"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Zap, Search, User } from "lucide-react"
import { VITE_API_URL } from "@/config/api"
import { getPaymentMethods } from "@/services/payment/payment"
import { returnVehicle } from "@/services/loan/loan"
import type { Vehicle } from "@/services/vehicle/getAllVehicle"

interface HeaderClientProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    userData: { name: string; email: string } | null
    reservedVehicles: { vehicleId: string; loanId: string }[]
    vehicles: Vehicle[]
    setReservedVehicles: React.Dispatch<
        React.SetStateAction<{ vehicleId: string; loanId: string }[]>
    >
    setShowPaymentModal: (open: boolean) => void
    setLoanToPay: (loanId: string | null) => void
    setPaymentMethods: (methods: string[]) => void
    setAmount: (amount: string) => void
}

export default function HeaderClient({
    searchTerm,
    setSearchTerm,
    userData,
    reservedVehicles,
    vehicles,
    setReservedVehicles,
    setShowPaymentModal,
    setLoanToPay,
    setPaymentMethods,
    setAmount,
}: HeaderClientProps) {
    const [stations, setStations] = useState<any[]>([])
    const [selectedStation, setSelectedStation] = useState<{ [key: string]: string }>({})
    const [showSelectForVehicle, setShowSelectForVehicle] = useState<string | null>(null)

    const handleShowSelect = async (vehicleId: string) => {
        try {
            const res = await fetch(`${VITE_API_URL}station`)
            const data = await res.json()
            setStations(data.message)
            setShowSelectForVehicle(vehicleId)
        } catch (err) {
            console.error("Error cargando estaciones:", err)
        }
    }

    const handleReturn = async (vehicleId: string) => {
        const reserved = reservedVehicles.find(r => r.vehicleId === vehicleId)
        if (!reserved) return

        if (!selectedStation[vehicleId]) {
            alert("Debes seleccionar una estación")
            return
        }

        try {
            const response = await returnVehicle({
                loanId: reserved.loanId,
                endStationId: selectedStation[vehicleId],
            })

            setAmount(response.amount.toString())

            setLoanToPay(reserved.loanId)
            const methods = await getPaymentMethods()
            setPaymentMethods(methods)
            setShowPaymentModal(true)

            // limpiar reservas
            setReservedVehicles(prev => prev.filter(r => r.vehicleId !== vehicleId))
            setShowSelectForVehicle(null)
        } catch (err) {
            alert("Error devolviendo vehículo")
        }
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {/* Título */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <Zap className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold text-primary">EcoMove Cliente</h1>
                </div>
            </div>

            {/* Buscador + perfil */}
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Buscar por nombre o modelo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Modal de usuario */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="p-2 rounded-md border border-transparent">
                            <User className="h-4 w-4" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {userData?.name
                                            ?.split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-semibold">{userData?.name ?? "Cargando..."}</h3>
                                    <p className="text-sm text-muted-foreground">{userData?.email ?? ""}</p>
                                </div>
                                <a href="/login" className="ml-40 text-sm text-primary hover:underline">
                                    salir
                                </a>
                            </DialogTitle>
                        </DialogHeader>

                        {/* Vehículos reservados */}
                        <div className="space-y-4">
                            <Separator />
                            <div className="space-y-3">
                                <h4 className="font-semibold text-primary">Vehículos Reservados</h4>
                                {reservedVehicles.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No tienes vehículos reservados</p>
                                ) : (
                                    <div className="space-y-2">
                                        {reservedVehicles.map(({ vehicleId, loanId }) => {
                                            const vehicle = vehicles.find((v) => v.idVehicle === vehicleId)
                                            return vehicle ? (
                                                <div key={vehicleId} className="p-3 bg-muted/50 rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium">{vehicle.model}</p>
                                                            <p className="text-sm text-muted-foreground">Reservado</p>
                                                        </div>

                                                        {showSelectForVehicle !== vehicleId && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-xs"
                                                                onClick={() => handleShowSelect(vehicleId)}
                                                            >
                                                                Devolver
                                                            </Button>
                                                        )}
                                                    </div>

                                                    {showSelectForVehicle === vehicleId && (
                                                        <div className="mt-3 space-y-3">
                                                            <select
                                                                value={selectedStation[vehicleId] || ""}
                                                                onChange={(e) =>
                                                                    setSelectedStation((prev) => ({
                                                                        ...prev,
                                                                        [vehicleId]: e.target.value,
                                                                    }))
                                                                }
                                                                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                                                            >
                                                                <option value="">Selecciona una estación</option>
                                                                {stations.map((station) => (
                                                                    <option key={station.idStation} value={station.idStation}>
                                                                        {station.name}
                                                                    </option>
                                                                ))}
                                                            </select>

                                                            <Button
                                                                onClick={() => handleReturn(vehicleId)}
                                                                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition"
                                                            >
                                                                Aceptar
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : null
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
