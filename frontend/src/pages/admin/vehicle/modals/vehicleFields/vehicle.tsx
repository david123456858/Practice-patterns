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
    const fieldComponents: Record<
        string,
        React.ReactNode
    > = {
        BICYCLE: (
            <BicycleFields
                formData={formData}
                handleInputChange={handleInputChange}
                renderMechanicalSelect={renderMechanicalSelect}
            />
        ),
        ELECTRIC_BICYCLE: (
            <ElectricBicycleFields
                formData={formData}
                handleInputChange={handleInputChange}
            />
        ),
        SCOOTER: (
            <ScooterFields
                formData={formData}
                handleInputChange={handleInputChange}
                renderMechanicalSelect={renderMechanicalSelect}
            />
        ),
        ELECTRIC_SCOOTER: (
            <ElectricScooterFields
                formData={formData}
                handleInputChange={handleInputChange}
            />
        ),
        CAR_ELECTRIC: (
            <CarElectricFields
                formData={formData}
                handleInputChange={handleInputChange}
            />
        ),
        SKATEBOARD: (
            <SkateboardFields
                formData={formData}
                handleInputChange={handleInputChange}
                renderMechanicalSelect={renderMechanicalSelect}
            />
        ),
        ELECTRIC_SKATEBOARD: (
            <ElectricSkateboardFields
                formData={formData}
                handleInputChange={handleInputChange}
            />
        ),
    }

    return fieldComponents[formData.tipoVehiculo] || null
}

export default VehicleFields
