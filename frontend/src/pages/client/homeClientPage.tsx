"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
    Car,
    Bike,
    Zap,
    Search,
    User,
    MapPin,
    Battery,
    Gauge,
    ChevronDown,
    ChevronUp,
    CreditCard,
    Banknote,
    QrCode,
} from "lucide-react"

// Datos estáticos de vehículos de ejemplo
const vehiclesData = [
    {
        id: 1,
        name: "Mazda 323",
        model: "Eléctrico Compacto",
        type: "car",
        status: "activo",
        batteryCapacity: "60 kWh",
        range: "400 km",
        location: "Estación Centro",
        costPerMinute: "$150",
    },
    {
        id: 2,
        name: "Hyundai Yatsen",
        model: "Sedán Eléctrico",
        type: "car",
        status: "activo",
        batteryCapacity: "75 kWh",
        range: "500 km",
        location: "Estación Norte",
        costPerMinute: "$200",
    },
    {
        id: 3,
        name: "Kia Rio",
        model: "Hatchback Eléctrico",
        type: "car",
        status: "activo",
        batteryCapacity: "50 kWh",
        range: "350 km",
        location: "Estación Sur",
        costPerMinute: "$120",
    },
    {
        id: 4,
        name: "Tesla Model 3",
        model: "Sedán Premium",
        type: "car",
        status: "activo",
        batteryCapacity: "82 kWh",
        range: "600 km",
        location: "Estación Chapinero",
        costPerMinute: "$300",
    },
    {
        id: 5,
        name: "EcoBike Pro",
        model: "Bicicleta Eléctrica",
        type: "bike",
        status: "activo",
        batteryCapacity: "0.5 kWh",
        range: "80 km",
        location: "Estación Zona Rosa",
        costPerMinute: "$50",
    },
    {
        id: 6,
        name: "Urban Scooter",
        model: "Scooter Eléctrico",
        type: "scooter",
        status: "activo",
        batteryCapacity: "1.2 kWh",
        range: "45 km",
        location: "Estación Universidad",
        costPerMinute: "$80",
    },
]

// Datos del usuario de ejemplo
const userData = {
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
}

export default function ClientPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedCard, setExpandedCard] = useState<number | null>(null)
    const [reservedVehicles, setReservedVehicles] = useState<number[]>([])
    const [reservationCode, setReservationCode] = useState("")
    const [showReservationModal, setShowReservationModal] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [selectedVehicleForReturn, setSelectedVehicleForReturn] = useState<number | null>(null)
    const [paymentMethod, setPaymentMethod] = useState("")

    // Filtrar vehículos activos y por término de búsqueda
    const filteredVehicles = vehiclesData.filter(
        (vehicle) =>
            vehicle.status === "activo" &&
            (vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    const getVehicleIcon = (type: string) => {
        switch (type) {
            case "car":
                return <Car className="h-8 w-8 text-primary" />
            case "bike":
                return <Bike className="h-8 w-8 text-primary" />
            case "scooter":
                return <Zap className="h-8 w-8 text-primary" />
            default:
                return <Car className="h-8 w-8 text-primary" />
        }
    }

    const toggleCardExpansion = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id)
    }

    const generateReservationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    const handleReserveVehicle = (vehicleId: number) => {
        const code = generateReservationCode()
        setReservationCode(code)
        setReservedVehicles([...reservedVehicles, vehicleId])
        setShowReservationModal(true)
    }

    const handleReturnVehicle = (vehicleId: number) => {
        setSelectedVehicleForReturn(vehicleId)
        setShowPaymentModal(true)
    }

    const handlePaymentComplete = () => {
        if (selectedVehicleForReturn) {
            setReservedVehicles(reservedVehicles.filter((id) => id !== selectedVehicleForReturn))
            setSelectedVehicleForReturn(null)
            setPaymentMethod("")
            setShowPaymentModal(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
            <div className="container mx-auto px-4 py-8">
                {/* Header con búsqueda y perfil */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Zap className="h-8 w-8 text-primary" />
                            <h1 className="text-3xl font-bold text-primary">EcoMove Client</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Barra de búsqueda */}
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar por nombre o modelo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Botón de perfil */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                                    <User className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src="/placeholder.svg?height=48&width=48" />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {userData.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-lg font-semibold">{userData.name}</h3>
                                            <p className="text-sm text-muted-foreground">{userData.email}</p>
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
                                                {reservedVehicles.map((vehicleId) => {
                                                    const vehicle = vehiclesData.find((v) => v.id === vehicleId)
                                                    return vehicle ? (
                                                        <div
                                                            key={vehicleId}
                                                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                                        >
                                                            <div>
                                                                <p className="font-medium">{vehicle.name}</p>
                                                                <p className="text-sm text-muted-foreground">Reservado</p>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleReturnVehicle(vehicleId)}
                                                                className="text-xs"
                                                            >
                                                                Devolver Vehículo
                                                            </Button>
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
                        <Card key={vehicle.id} className="shadow-lg border-border/50 hover:shadow-xl transition-all duration-300">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getVehicleIcon(vehicle.type)}
                                        <div>
                                            <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                                            <CardDescription>{vehicle.model}</CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                                        {vehicle.status}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{vehicle.location}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Costo por minuto:</span>
                                    <span className="font-semibold text-primary">{vehicle.costPerMinute}</span>
                                </div>

                                {/* Información expandible */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleCardExpansion(vehicle.id)}
                                    className="w-full justify-between p-2 h-8"
                                >
                                    <span className="text-xs">Ver detalles</span>
                                    {expandedCard === vehicle.id ? (
                                        <ChevronUp className="h-3 w-3" />
                                    ) : (
                                        <ChevronDown className="h-3 w-3" />
                                    )}
                                </Button>

                                {expandedCard === vehicle.id && (
                                    <div className="space-y-2 pt-2 border-t border-border/50">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <Battery className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Capacidad:</span>
                                            </div>
                                            <span className="font-medium">{vehicle.batteryCapacity}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <Gauge className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Autonomía:</span>
                                            </div>
                                            <span className="font-medium">{vehicle.range}</span>
                                        </div>

                                        {!reservedVehicles.includes(vehicle.id) && (
                                            <Button
                                                className="w-full mt-3 bg-primary hover:bg-primary/90"
                                                onClick={() => handleReserveVehicle(vehicle.id)}
                                            >
                                                Reservar Vehículo
                                            </Button>
                                        )}

                                        {reservedVehicles.includes(vehicle.id) && (
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

                {/* Mensaje cuando no hay resultados */}
                {filteredVehicles.length === 0 && (
                    <div className="text-center py-12">
                        <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">No se encontraron vehículos</h3>
                        <p className="text-muted-foreground">
                            Intenta con otros términos de búsqueda o verifica que haya vehículos disponibles.
                        </p>
                    </div>
                )}

                <Dialog open={showReservationModal} onOpenChange={setShowReservationModal}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <QrCode className="h-5 w-5 text-primary" />
                                Reserva Confirmada
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 text-center">
                            <p className="text-muted-foreground">
                                Por favor, diríjase a la estación más cercana de EcoMove y presente el siguiente código:
                            </p>

                            <div className="bg-primary/10 p-6 rounded-lg">
                                <p className="text-2xl font-bold text-primary tracking-wider">{reservationCode}</p>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Presente este código para que su vehículo pueda ser entregado.
                            </p>

                            <Button onClick={() => setShowReservationModal(false)} className="w-full bg-primary hover:bg-primary/90">
                                Aceptar
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-primary" />
                                Devolver Vehículo
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            <p className="text-muted-foreground">Selecciona tu método de pago para completar la devolución:</p>

                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                                    <RadioGroupItem value="transfer" id="transfer" />
                                    <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                                        <Banknote className="h-4 w-4" />
                                        Pago por Transferencia
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                                        <CreditCard className="h-4 w-4" />
                                        Pago por Tarjeta
                                    </Label>
                                </div>
                            </RadioGroup>

                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handlePaymentComplete}
                                    disabled={!paymentMethod}
                                    className="flex-1 bg-primary hover:bg-primary/90"
                                >
                                    Confirmar Pago
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
