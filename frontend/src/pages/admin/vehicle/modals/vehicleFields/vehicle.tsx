import React from "react"
import {
    BicycleFields,
    ElectricBicycleFields,
    ScooterFields,
    ElectricScooterFields,
    CarElectricFields,
    SkateboardFields,
    ElectricSkateboardFields,
} from "./index"

interface VehicleFieldsProps {
    formData: Record<string, any>
    handleInputChange: (field: string, value: string) => void
    renderMechanicalSelect: (name: "drive" | "brake" | "bearing", label: string) => React.ReactNode
}

const VehicleFields: React.FC<VehicleFieldsProps> = ({
    formData,
    handleInputChange,
    renderMechanicalSelect,
}) => {
    switch (formData.tipoVehiculo) {
        case "BICYCLE":
            return (
                <BicycleFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                    renderMechanicalSelect={renderMechanicalSelect}
                />
            )

        case "ELECTRIC_BICYCLE":
            return (
                <ElectricBicycleFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
            )

        case "SCOOTER":
            return (
                <ScooterFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                    renderMechanicalSelect={renderMechanicalSelect}
                />
            )

        case "ELECTRIC_SCOOTER":
            return (
                <ElectricScooterFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
            )

        case "CAR_ELECTRIC":
            return (
                <CarElectricFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
            )

        case "SKATEBOARD":
            return (
                <SkateboardFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                    renderMechanicalSelect={renderMechanicalSelect}
                />
            )

        case "ELECTRIC_SKATEBOARD":
            return (
                <ElectricSkateboardFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
            )

        default:
            return null
    }
}

export default VehicleFields
