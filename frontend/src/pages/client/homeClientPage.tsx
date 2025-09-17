"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    Car,
    Bike,
    Zap,
    Search,
    User,
    MapPin,
    ChevronDown,
    ChevronUp,
    QrCode,
} from "lucide-react"
import { getAvailableVehicles } from "@/services/vehicle/getVehicleAvailable"
import { createLoan } from "@/services/loan/getAllLoan"
import { type Vehicle } from "@/services/vehicle/getAllVehicle"
import { returnVehicle } from "@/services/loan/getAllLoan"
import { getPaymentMethods, createPayment } from "@/services/payment/payment"

export default function ClientPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedCard, setExpandedCard] = useState<string | null>(null) // idVehicle
    const [reservedVehicles, setReservedVehicles] = useState<{ vehicleId: string; loanId: string }[]>([])
    const [reservationCode, setReservationCode] = useState("")
    const [showReservationModal, setShowReservationModal] = useState(false)

    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])

    // estaciones
    const [stations, setStations] = useState<any[]>([])
    const [selectedStation, setSelectedStation] = useState<{ [key: string]: string }>({})
    const [showSelectForVehicle, setShowSelectForVehicle] = useState<string | null>(null)

    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [paymentMethods, setPaymentMethods] = useState<string[]>([])
    const [selectedMethod, setSelectedMethod] = useState("")
    const [amount, setAmount] = useState<string>("")

    const [loanToPay, setLoanToPay] = useState<string | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUserData({
                name: parsedUser.userName,
                email: parsedUser.userEmail,
            })
        }
    }, [])

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getAvailableVehicles()
                setVehicles(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchVehicles()
    }, [])

    const filteredVehicles = vehicles.filter(
        (vehicle) =>
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getVehicleIcon = (type: string) => {
        switch (type) {
            case "car":
                return <Car className="h-8 w-8 text-primary" />
            case "bicycle":
                return <Bike className="h-8 w-8 text-primary" />
            case "electric_scooter":
                return <Zap className="h-8 w-8 text-primary" />
            default:
                return <Car className="h-8 w-8 text-primary" />
        }
    }

    const toggleCardExpansion = (id: string) => {
        setExpandedCard(prev => (prev === id ? null : id))
    }

    const handleReserveVehicle = async (vehicle: Vehicle) => {
        try {
            const storedUser = localStorage.getItem("user")
            if (!storedUser) throw new Error("Usuario no autenticado")

            const parsedUser = JSON.parse(storedUser)

            const payload = {
                loanId: Math.floor(100000 + Math.random() * 900000).toString(),
                userId: parsedUser.userId, // ⚠️ asegurarse que aquí es userId y no idUser
                vehicleId: vehicle.idVehicle,
                startStationId: vehicle.idStation,
            }

            await createLoan(payload)

            setReservedVehicles(prev => [...prev, { vehicleId: vehicle.idVehicle, loanId: payload.loanId }])
            setReservationCode(payload.loanId)
            setShowReservationModal(true)
        } catch (err) {
            console.error(err)
            alert("Error al reservar vehículo")
        }
    }

    const handleShowSelect = async (vehicleId: string) => {
        try {
            const res = await fetch("https://lq3p60dt-3000.use2.devtunnels.ms/api/v1/station")
            const data = await res.json()
            setStations(data.message)
            setShowSelectForVehicle(vehicleId)
        } catch (err) {
            console.error("Error cargando estaciones:", err)
        }
    }

    // al devolver vehículo -> abrir modal de pago
    const handleReturn = async (vehicleId: string) => {
        const reserved = reservedVehicles.find(r => r.vehicleId === vehicleId)
        if (!reserved) return

        if (!selectedStation[vehicleId]) {
            alert("Debes seleccionar una estación")
            return
        }

        try {
            await returnVehicle({
                loanId: reserved.loanId,
                endStationId: selectedStation[vehicleId],
            })

            // abrir modal de pago
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

    // confirmar pago
    const handlePayment = async () => {
        if (!loanToPay) return
        if (!amount || !selectedMethod) {
            alert("Debes completar todos los campos")
            return
        }

        try {

            const numericAmount = parseFloat(amount) || 0

            await createPayment({
                loanId: loanToPay,
                amount: numericAmount,
                method: selectedMethod,
            })

            alert("Pago realizado con éxito ✅")
            setShowPaymentModal(false)
            setLoanToPay(null)
            setSelectedMethod("")
        } catch {
            alert("Error procesando el pago")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Zap className="h-8 w-8 text-primary" />
                            <h1 className="text-3xl font-bold text-primary">EcoMove Cliente</h1>
                        </div>
                    </div>

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
                                    </DialogTitle>
                                </DialogHeader>

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

                {/* Grid de vehículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVehicles.map((vehicle) => (
                        <Card
                            key={vehicle.idVehicle}
                            className="shadow-lg border-border/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getVehicleIcon(vehicle.type)}
                                        <div>
                                            <CardTitle className="text-lg">{vehicle.model}</CardTitle>
                                            <CardDescription className="capitalize">{vehicle.type}</CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-muted-foreground">{vehicle.idStation}</div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>Estación: {vehicle.nameStation}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Costo por minuto:</span>
                                    <span className="font-semibold text-primary">{vehicle.costForMinute}</span>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleCardExpansion(vehicle.idVehicle)}
                                    className="w-full justify-between p-2 h-8"
                                >
                                    <span className="text-xs">Ver detalles</span>
                                    {expandedCard === vehicle.idVehicle ? (
                                        <ChevronUp className="h-3 w-3" />
                                    ) : (
                                        <ChevronDown className="h-3 w-3" />
                                    )}
                                </Button>

                                {expandedCard === vehicle.idVehicle && (
                                    <div className="space-y-2 pt-2 border-t border-border/50">
                                        {vehicle.type === "bicycle" && (
                                            <>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Engranajes:</span>
                                                    <span className="font-medium">{vehicle.gears ?? "N/A"}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Canasta:</span>
                                                    <span className="font-medium">{vehicle.hasBasket ? "Sí" : "No"}</span>
                                                </div>
                                            </>
                                        )}

                                        {vehicle.type === "electric_scooter" && (
                                            <>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Asiento:</span>
                                                    <span className="font-medium">{vehicle.hasSeat ? "Sí" : "No"}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Capacidad batería:</span>
                                                    <span className="font-medium">{vehicle.batteryInfo?.capacity ?? "N/A"}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Autonomía:</span>
                                                    <span className="font-medium">{vehicle.batteryInfo?.autonomyRange ?? "N/A"}</span>
                                                </div>
                                            </>
                                        )}

                                        {!reservedVehicles.some(r => r.vehicleId === vehicle.idVehicle) ? (
                                            <Button
                                                className="w-full mt-3 bg-primary hover:bg-primary/90"
                                                onClick={() => handleReserveVehicle(vehicle)}
                                            >
                                                Reservar Vehículo
                                            </Button>
                                        ) : (
                                            <div className="w-full mt-3 p-2 bg-primary/10 text-primary text-center rounded-md text-sm font-medium">
                                                Vehículo Reservado
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Modal de reserva */}
                <Dialog open={showReservationModal} onOpenChange={setShowReservationModal}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <QrCode className="h-5 w-5 text-primary" />
                                Reserva Confirmada
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 text-center">
                            {/* Mensaje informativo */}
                            <p className="text-sm text-muted-foreground">
                                Este código es de un solo uso. Por favor, acérquese a la estación de EcoMove más cercana y,
                                cuando reciba su vehículo, presione <span className="font-medium text-primary">"Aceptar"</span>.
                            </p>

                            <div className="bg-primary/10 p-6 rounded-lg">
                                <p className="text-2xl font-bold text-primary tracking-wider">{reservationCode}</p>
                            </div>

                            <Button
                                onClick={() => setShowReservationModal(false)}
                                className="w-full bg-primary hover:bg-primary/90"
                            >
                                Aceptar
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Modal de pago */}
                <Dialog open={showPaymentModal} onOpenChange={() => { }}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-primary">Realizar Pago</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Para finalizar la devolución del vehículo, debe realizar el pago.
                            </p>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Monto</label>
                                <Input
                                    type="number"
                                    placeholder="Ingrese el monto"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}  // manejar como string
                                />
                            </div>


                            {/* Método de pago */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Método de Pago</label>
                                <select
                                    value={selectedMethod}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                                >
                                    <option value="">Seleccione un método</option>
                                    {paymentMethods.map((method) => (
                                        <option key={method} value={method}>
                                            {method}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Button
                                onClick={handlePayment}
                                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md"
                            >
                                Confirmar Pago
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}
