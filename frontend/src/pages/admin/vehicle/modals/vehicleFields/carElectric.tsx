import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

interface ElectricCarFieldsProps {
    formData: Record<string, any>
    handleInputChange: (field: string, value: string) => void
}

const ElectricCarFields: React.FC<ElectricCarFieldsProps> = ({
    formData,
    handleInputChange,
}) => {
    if (formData.tipoVehiculo !== "ELECTRIC_CAR") return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Número de puertas */}
            <div>
                <Label htmlFor="numeroPuertas" className="text-green-700 block mb-3">
                    Número de puertas
                </Label>
                <Input
                    id="numeroPuertas"
                    type="number"
                    value={formData.numeroPuertas || ""}
                    onChange={(e) => handleInputChange("numeroPuertas", e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder="Ej: 4"
                />
            </div>

            {/* Aire acondicionado */}
            <div>
                <Label htmlFor="tieneAireAcondicionado" className="text-green-700 block mb-3">
                    ¿Tiene aire acondicionado?
                </Label>
                <Select
                    value={formData.tieneAireAcondicionado || ""}
                    onValueChange={(v) => handleInputChange("tieneAireAcondicionado", v)}
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

            {/* Capacidad de batería */}
            <div>
                <Label htmlFor="capacidadBateria" className="text-green-700 block mb-3">
                    Capacidad de la Batería (kWh)
                </Label>
                <Input
                    id="capacidadBateria"
                    type="number"
                    value={formData.capacidadBateria || ""}
                    onChange={(e) => handleInputChange("capacidadBateria", e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder="Ej: 75"
                />
            </div>

            {/* Autonomía */}
            <div>
                <Label htmlFor="autonomiaRango" className="text-green-700 block mb-3">
                    Autonomía (km)
                </Label>
                <Input
                    id="autonomiaRango"
                    type="number"
                    value={formData.autonomiaRango || ""}
                    onChange={(e) => handleInputChange("autonomiaRango", e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder="Ej: 450"
                />
            </div>
        </div>
    )
}

export default ElectricCarFields
