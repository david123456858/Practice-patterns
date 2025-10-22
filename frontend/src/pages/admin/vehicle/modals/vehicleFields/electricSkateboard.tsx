import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ElectricSkateboardFieldsProps {
    formData: Record<string, any>
    handleInputChange: (field: string, value: string) => void
}

const ElectricSkateboardFields: React.FC<ElectricSkateboardFieldsProps> = ({
    formData,
    handleInputChange,
}) => {
    if (formData.tipoVehiculo !== "ELECTRIC_SKATEBOARD") return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capacidad de la batería */}
            <div>
                <Label htmlFor="capacidadBateria" className="text-green-700 block mb-3">
                    Capacidad de la Batería (Wh / mAh)
                </Label>
                <Input
                    id="capacidadBateria"
                    type="number"
                    value={formData.capacidadBateria || ""}
                    onChange={(e) => handleInputChange("capacidadBateria", e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder="Ej: 200"
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
                    placeholder="Ej: 20"
                />
            </div>
        </div>
    )
}

export default ElectricSkateboardFields
