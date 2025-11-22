"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Bike, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { type Vehicle } from "@/interface/vehicle/vehicleInterface"

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
                    className="group shadow-lg border-border/50 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm"
                >
                    <div className="relative h-48 w-full bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center overflow-hidden">
                        {vehicle.image && vehicle.image.length > 0 ? (
                            <img
                                src={vehicle.image[0] || "/placeholder.svg"}
                                alt={vehicle.model}
                                className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                {getVehicleIcon(vehicle.type)}
                                <p className="text-xs mt-1">Sin imagen</p>
                            </div>
                        )}
                        <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-fade-in">
                            {vehicle.stationId}
                        </div>
                    </div>

                    <CardHeader className="pb-3 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                                    {getVehicleIcon(vehicle.type)}
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                                        {vehicle.model}
                                    </CardTitle>
                                    <CardDescription className="capitalize text-sm">{vehicle.type}</CardDescription>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10">
                            <span className="text-sm text-muted-foreground">Costo por minuto:</span>
                            <span className="font-bold text-lg text-primary">{vehicle.costForMinute}</span>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCardExpansion(vehicle.idVehicle)}
                            className="w-full justify-between p-3 h-auto hover:bg-primary/10 transition-all duration-300"
                        >
                            <span className="text-sm font-medium">Ver detalles</span>
                            {expandedCard === vehicle.idVehicle ? (
                                <ChevronUp className="h-4 w-4 transition-transform duration-300" />
                            ) : (
                                <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                            )}
                        </Button>

                        {expandedCard === vehicle.idVehicle && (
                            <div className="space-y-3 pt-3 border-t border-border/50 animate-fade-in">
                                {vehicle.type === "bicycle" && (
                                    <>
                                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
                                            <span className="text-sm text-muted-foreground">Engranajes:</span>
                                            <span className="font-semibold text-foreground">{vehicle.propities.gears ?? "N/A"}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
                                            <span className="text-sm text-muted-foreground">Canasta:</span>
                                            <span className="font-semibold text-foreground">{vehicle.propities.hasBasket ? "Sí" : "No"}</span>
                                        </div>
                                    </>
                                )}

                                {vehicle.type === "electric_scooter" && (
                                    <>
                                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
                                            <span className="text-sm text-muted-foreground">Asiento:</span>
                                            <span className="font-semibold text-foreground">{vehicle.propities.hasSeat ? "Sí" : "No"}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
                                            <span className="text-sm text-muted-foreground">Capacidad batería:</span>
                                            <span className="font-semibold text-foreground">
                                                {" "}
                                                {vehicle.propities?.info && "capacity" in vehicle.propities.info
                                                    ? vehicle.propities.info.capacity
                                                    : "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
                                            <span className="text-sm text-muted-foreground">Autonomía:</span>
                                            <span className="font-semibold text-foreground">
                                                {" "}
                                                {vehicle.propities?.info && "autonomyRange" in vehicle.propities.info
                                                    ? vehicle.propities.info.autonomyRange
                                                    : "N/A"}
                                            </span>
                                        </div>
                                    </>
                                )}

                                {!reservedVehicles.some((r) => r.vehicleId === vehicle.idVehicle) ? (
                                    <Button
                                        className="w-full mt-3 bg-primary hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg"
                                        onClick={() => onReserve(vehicle)}
                                    >
                                        Reservar Vehículo
                                    </Button>
                                ) : (
                                    <div className="w-full mt-3 p-3 bg-primary/10 text-primary text-center rounded-lg text-sm font-semibold border-2 border-primary/20 animate-pulse">
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
