import React from "react"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

interface ScooterFieldsProps {
    formData: Record<string, any>
    handleInputChange: (field: string, value: string) => void
    renderMechanicalSelect: (name: "drive" | "brake" | "bearing", label: string) => React.ReactNode
}

const ScooterFields: React.FC<ScooterFieldsProps> = ({
    formData,
    handleInputChange,
    renderMechanicalSelect,
}) => {
    if (formData.tipoVehiculo !== "SCOOTER") return null

    return (
        <div className="space-y-6">
            {/* Campo para saber si tiene asiento */}
            <div>
                <Label htmlFor="tieneAsiento" className="text-green-700 block mb-3">
                    ¿Tiene asiento?
                </Label>
                <Select
                    value={formData.tieneAsiento || ""}
                    onValueChange={(v) => handleInputChange("tieneAsiento", v)}
                >
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Seleccionar opción" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="YES">Sí</SelectItem>
                        <SelectItem value="NO">No</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Información mecánica */}
            <div className="flex flex-col gap-6">
                {renderMechanicalSelect("drive", "Drive System")}
                {renderMechanicalSelect("brake", "Brake Type")}
                {renderMechanicalSelect("bearing", "Bearing Type")}
            </div>
        </div>
    )
}

export default ScooterFields
