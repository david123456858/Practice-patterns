import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

interface BicycleFieldsProps {
    formData: Record<string, any>
    handleInputChange: (field: string, value: string) => void
    renderMechanicalSelect: (name: "drive" | "brake" | "bearing", label: string) => React.ReactNode
}

export default function BicycleFields({ formData, handleInputChange, renderMechanicalSelect }: BicycleFieldsProps) {
    return (
        <div className="space-y-6">
            {/* ⚙️ Cantidad de engranajes */}
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

            {/* 🧺 Tiene cesta */}
            <div>
                <Label htmlFor="tieneCesta" className="text-green-700 block mb-3">
                    ¿Tiene Cesta?
                </Label>
                <Select
                    value={formData.tieneCesta}
                    onValueChange={(v) => handleInputChange("tieneCesta", v)}
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

            {/* 🔧 Información mecánica */}
            <div className="flex flex-col gap-6">
                {renderMechanicalSelect("drive", "Drive System")}
                {renderMechanicalSelect("brake", "Brake Type")}
                {renderMechanicalSelect("bearing", "Bearing Type")}
            </div>
        </div>
    )
}
