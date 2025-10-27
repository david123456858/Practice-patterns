import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ElectricBicycleFieldsProps {
    formData: Record<string, any>
    handleInputChange: (field: string, value: string) => void
}

const ElectricBicycleFields: React.FC<ElectricBicycleFieldsProps> = ({
    formData,
    handleInputChange,
}) => {
    if (formData.tipoVehiculo !== "ELECTRIC_BICYCLE") return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Label htmlFor="capacidadBateria" className="text-green-700 block mb-3">
                    Capacidad de la Batería (mAh / kWh)
                </Label>
                <Input
                    id="capacidadBateria"
                    type="number"
                    value={formData.capacidadBateria || ""}
                    onChange={(e) => handleInputChange("capacidadBateria", e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder="Ej: 500"
                />
            </div>

            <div>
                <Label htmlFor="autonomiaRango" className="text-green-700 block mb-3">
                    Autonomía de la Batería (km)
                </Label>
                <Input
                    id="autonomiaRango"
                    type="number"
                    value={formData.autonomiaRango || ""}
                    onChange={(e) => handleInputChange("autonomiaRango", e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder="Ej: 50"
                />
            </div>
        </div>
    )
}

export default ElectricBicycleFields
