"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Bike, Zap, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { type Vehicle } from "@/services/vehicle/getAllVehicle"

interface VehicleGridProps {
    vehicles: Vehicle[]
    reservedVehicles: { vehicleId: string; loanId: string }[]
    onReserve: (vehicle: Vehicle) => void
}

export default function VehicleGrid({
    vehicles,
    reservedVehicles,
    onReserve,
}: VehicleGridProps) {
    const [expandedCard, setExpandedCard] = useState<string | null>(null)

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
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
                            <div className="text-sm font-medium text-muted-foreground">{vehicle.stationId}</div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Estación: {vehicle.name}</span>
                        </div> */}

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
                                        onClick={() => onReserve(vehicle)}
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
    )
}
