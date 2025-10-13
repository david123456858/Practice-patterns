"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"
import { useState, useEffect } from "react"
import { Car } from "lucide-react"
import { getVehicleTypes } from "@/services/vehicle/getTypeVehicle"
import { createVehicle } from "@/services/vehicle/createVehicle"
import { getStations, type Station } from "@/services/station/station"
import { type BicycleData, type ScooterData, type SkateboardData } from "@/interface/vehicleInterface";

interface AddVehicleModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AddVehicleModal({ isOpen, onClose }: AddVehicleModalProps) {
    const initialFormData = {
        id: "",
        color: "",
        modelo: "",
        estacion: "",
        maxUsuarios: "",
        velocidadMaxima: "",
        costoPorMinuto: "",
        tipoVehiculo: "",
        // Campos específicos
        engranajes: "",
        tieneCesta: "",
        tamanoCubierta: "",
        tieneAsiento: "",
        capacidadBateria: "",
        autonomiaRango: "",
        numeroPuertas: "",
        tieneAireAcondicionado: "",
    }

    const [formData, setFormData] = useState(initialFormData)
    const [vehicleTypes, setVehicleTypes] = useState<Record<string, string>>({})
    const [estaciones, setEstaciones] = useState<Station[]>([])

    useEffect(() => {
        const fetchStations = async () => {
            const data = await getStations();
            setEstaciones(data);
        };
        fetchStations();
    }, []);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormData)
            getVehicleTypes().then(setVehicleTypes).catch(console.error)
            getStations().then(setEstaciones).catch(console.error)
        }
    }, [isOpen])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const estacionSeleccionada = estaciones.find(
            (est) => String(est.idStation) === formData.estacion
        )
        if (!estacionSeleccionada) {
            alert("Debes seleccionar una estación")
            return
        }

        // Campos comunes
        const baseData = {
            idVehicle: formData.id,
            color: formData.color,
            model: formData.modelo,
            idStation: estacionSeleccionada.idStation,
            latitude: Number(estacionSeleccionada.geoLocation.latitude),
            longitude: Number(estacionSeleccionada.geoLocation.longitude),
            maxUserWeight: Number(formData.maxUsuarios),
            velocityMax: Number(formData.velocidadMaxima),
            costForMinute: Number(formData.costoPorMinuto),
        }

        // Union type para vehicleData
        let vehicleData: BicycleData | ScooterData | SkateboardData

        switch (formData.tipoVehiculo) {
            case "BICYCLE":
                vehicleData = {
                    ...baseData,
                    vehicleType: "bicycle",
                    gears: Number(formData.engranajes),
                    hasBasket: formData.tieneCesta === "YES",
                }
                break

            case "ELECTRIC_SCOOTER":
                vehicleData = {
                    ...baseData,
                    vehicleType: "electric_scooter",
                    hasSeat: formData.tieneAsiento === "YES",
                    batteryInfo: {
                        capacity: Number(formData.capacidadBateria),
                        autonomyRange: Number(formData.autonomiaRango),
                    },
                }
                break

            case "SKATEBOARD":
                vehicleData = {
                    ...baseData,
                    vehicleType: "skateboard",
                    deckSize: Number(formData.tamanoCubierta),
                }
                break

            default:
                alert("Tipo de vehículo no soportado")
                return
        }

        try {
            await createVehicle(vehicleData)
            alert("Vehículo creado con éxito ✅")
            onClose()
        } catch (err) {
            console.error(err)
            alert("Error creando vehículo")
        }
    }


    const renderConditionalFields = () => {
        switch (formData.tipoVehiculo) {
            case "BICYCLE":
                return (
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="engranajes" className="text-green-700 block mb-3">
                                Cantidad de Engranajes
                            </Label>
                            <Input
                                id="engranajes"
                                type="number"
                                value={formData.engranajes}
                                onChange={(e) => handleInputChange("engranajes", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: 21"
                            />
                        </div>
                        <div>
                            <Label htmlFor="tieneCesta" className="text-green-700 block mb-3">
                                ¿Tiene Cesta?
                            </Label>
                            <Select value={formData.tieneCesta} onValueChange={(value) => handleInputChange("tieneCesta", value)}>
                                <SelectTrigger className="border-green-200 focus:border-green-500">
                                    <SelectValue placeholder="Seleccionar opción" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="YES">YES</SelectItem>
                                    <SelectItem value="NO">NO</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )

            case "SKATEBOARD":
                return (
                    <div>
                        <Label htmlFor="tamanoCubierta" className="text-green-700 block mb-3">
                            Tamaño de la Cubierta
                        </Label>
                        <Input
                            id="tamanoCubierta"
                            value={formData.tamanoCubierta}
                            onChange={(e) => handleInputChange("tamanoCubierta", e.target.value)}
                            className="border-green-200 focus:border-green-500"
                            placeholder="Ej: 8 pulgadas"
                        />
                    </div>
                )

            case "ELECTRIC_SCOOTER":
                return (
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="tieneAsiento" className="text-green-700 block mb-3">
                                ¿Tiene asiento?
                            </Label>
                            <Select
                                value={formData.tieneAsiento}
                                onValueChange={(value) => handleInputChange("tieneAsiento", value)}
                            >
                                <SelectTrigger className="border-green-200 focus:border-green-500">
                                    <SelectValue placeholder="Seleccionar opción" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="YES">YES</SelectItem>
                                    <SelectItem value="NO">NO</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Nuevo bloque para Battery Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="capacidadBateria" className="text-green-700 block mb-3">
                                    Capacidad de la Batería (mAh / kWh)
                                </Label>
                                <Input
                                    id="capacidadBateria"
                                    type="number"
                                    value={formData.capacidadBateria}
                                    onChange={(e) => handleInputChange("capacidadBateria", e.target.value)}
                                    className="border-green-200 focus:border-green-500"
                                    placeholder="Ej: 5000"
                                />
                            </div>
                            <div>
                                <Label htmlFor="autonomiaRango" className="text-green-700 block mb-3">
                                    Autonomía de la Batería (km)
                                </Label>
                                <Input
                                    id="autonomiaRango"
                                    type="number"
                                    value={formData.autonomiaRango}
                                    onChange={(e) => handleInputChange("autonomiaRango", e.target.value)}
                                    className="border-green-200 focus:border-green-500"
                                    placeholder="Ej: 25"
                                />
                            </div>
                        </div>
                    </div>
                )

            case "CAR_ELECTRIC":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="capacidadBateria" className="text-green-700 block mb-3">
                                Capacidad de la Batería (kWh)
                            </Label>
                            <Input
                                id="capacidadBateria"
                                type="number"
                                value={formData.capacidadBateria}
                                onChange={(e) => handleInputChange("capacidadBateria", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: 75"
                            />
                        </div>
                        <div>
                            <Label htmlFor="autonomiaRango" className="text-green-700 block mb-3">
                                Autonomía (km)
                            </Label>
                            <Input
                                id="autonomiaRango"
                                type="number"
                                value={formData.autonomiaRango}
                                onChange={(e) => handleInputChange("autonomiaRango", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: 450"
                            />
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-green-800 text-xl flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Agregar Nuevo Vehículo
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campos básicos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="id" className="text-green-700 block mb-3">
                                ID del Vehículo
                            </Label>
                            <Input
                                id="id"
                                value={formData.id}
                                onChange={(e) => handleInputChange("id", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: VH009"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="color" className="text-green-700 block mb-3">
                                Color
                            </Label>
                            <Input
                                id="color"
                                value={formData.color}
                                onChange={(e) => handleInputChange("color", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: Azul"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="modelo" className="text-green-700 block mb-3">
                                Modelo
                            </Label>
                            <Input
                                id="modelo"
                                value={formData.modelo}
                                onChange={(e) => handleInputChange("modelo", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: Tesla Model Y"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="estacion" className="text-green-700 block mb-3">
                                Estación
                            </Label>
                            <Select
                                value={formData.estacion}
                                onValueChange={(value) => handleInputChange("estacion", value)}
                            >
                                <SelectTrigger className="border-green-200 focus:border-green-500">
                                    <SelectValue placeholder="Seleccionar estación" />
                                </SelectTrigger>
                                <SelectContent>
                                    {estaciones.map((est) => (
                                        <SelectItem key={est.idStation} value={String(est.idStation)}>
                                            {est.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="maxUsuarios" className="text-green-700 block mb-3">
                                Máximo de Usuarios
                            </Label>
                            <Input
                                id="maxUsuarios"
                                type="number"
                                value={formData.maxUsuarios}
                                onChange={(e) => handleInputChange("maxUsuarios", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: 4"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="velocidadMaxima" className="text-green-700 block mb-3">
                                Velocidad Máxima (km/h)
                            </Label>
                            <Input
                                id="velocidadMaxima"
                                type="number"
                                step="0.01"
                                value={formData.velocidadMaxima}
                                onChange={(e) => handleInputChange("velocidadMaxima", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: 120.5"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="costoPorMinuto" className="text-green-700 block mb-3">
                                Costo por Minuto ($)
                            </Label>
                            <Input
                                id="costoPorMinuto"
                                type="number"
                                step="0.01"
                                value={formData.costoPorMinuto}
                                onChange={(e) => handleInputChange("costoPorMinuto", e.target.value)}
                                className="border-green-200 focus:border-green-500"
                                placeholder="Ej: 250.00"
                                required
                            />
                        </div>
                    </div>

                    {/* Tipo de vehículo */}
                    <div>
                        <Label htmlFor="tipoVehiculo" className="text-green-700 block mb-3">
                            Tipo de Vehículo
                        </Label>
                        <Select value={formData.tipoVehiculo} onValueChange={(value) => handleInputChange("tipoVehiculo", value)}>
                            <SelectTrigger className="border-green-200 focus:border-green-500">
                                <SelectValue placeholder="Seleccionar tipo de vehículo" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(vehicleTypes).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Campos condicionales */}
                    {formData.tipoVehiculo && (
                        <div className="border-t border-green-200 pt-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-6">
                                Campos específicos para {vehicleTypes[formData.tipoVehiculo]}
                            </h3>
                            {renderConditionalFields()}
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-green-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-green-300 text-green-600 hover:bg-green-50 bg-transparent"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                            Agregar Vehículo
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
