import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SkateboardFieldsProps {
    formData: Record<string, any>
    handleInputChange: (field: string, value: string) => void
    renderMechanicalSelect: (name: "drive" | "brake" | "bearing", label: string) => React.ReactNode
}

const SkateboardFields: React.FC<SkateboardFieldsProps> = ({
    formData,
    handleInputChange,
    renderMechanicalSelect,
}) => {
    if (formData.tipoVehiculo !== "SKATEBOARD") return null

    return (
        <div className="space-y-6">
            {/* Tamaño de la cubierta */}
            <div>
                <Label htmlFor="tamanoCubierta" className="text-green-700 block mb-3">
                    Tamaño de la Cubierta (inches / cm)
                </Label>
                <Input
                    id="tamanoCubierta"
                    type="number"
                    value={formData.tamanoCubierta || ""}
                    onChange={(e) => handleInputChange("tamanoCubierta", e.target.value)}
                    className="border-green-200 focus:border-green-500"
                    placeholder="Ej: 32"
                />
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

export default SkateboardFields
