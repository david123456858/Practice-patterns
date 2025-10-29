import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import { createVehicle } from "@/services/vehicle/createVehicle"
import { getVehicleTypes } from "@/services/vehicle/getTypeVehicle"
import { getVehicleMechanicalTypes } from "@/services/vehicle/getVehicleMechanicalTypes"
import { getStations } from "@/services/station/station"
import VehicleFields from "./vehicleFields/vehicle"
import { type Station } from "@/interface/station/station"
import { uploadVehicleImage } from "@/services/vehicle/images/createImage"

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function AddVehicleModal({ isOpen, onClose }: Props) {
    const initialFormData = {
        id: "",
        color: "",
        modelo: "",
        estacion: "",
        maxUsuarios: "",
        velocidadMaxima: "",
        costoPorMinuto: "",
        tipoVehiculo: "",
        engranajes: "",
        tieneCesta: "",
        tamanoCubierta: "",
        tieneAsiento: "",
        capacidadBateria: "",
        autonomiaRango: "",
        numeroPuertas: "",
        tieneAireAcondicionado: "",
        drive: "",
        brake: "",
        bearing: "",
    }

    const [formData, setFormData] = useState(initialFormData)
    const [vehicleTypes, setVehicleTypes] = useState<Record<string, string>>({})
    const [selectedImage, setSelectedImage] = useState(null) // 📸 NUEVO estado
    const [mechanicalTypes, setMechanicalTypes] = useState<{
        drive: Record<string, string>
        bearing: Record<string, string>
        brake: Record<string, string>
    }>({
        drive: {},
        bearing: {},
        brake: {},
    })
    const [estaciones, setEstaciones] = useState<Station[]>([])


    const loadStations = async () => {
        try {
            const stations = await getStations()
            setEstaciones(stations)
        } catch (err) {
            console.error("Error fetching stations:", err)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormData)
            loadStations()
            getVehicleTypes().then(setVehicleTypes).catch(console.error)
            getVehicleMechanicalTypes().then(setMechanicalTypes).catch(console.error)
        }
    }, [isOpen])

    const handleInputChange = (field: string, value: string) =>
        setFormData((prev) => ({ ...prev, [field]: value }))

    function mapFormDataToVehicle(formData: any) {
        const selectedStation = estaciones.find((s) => s.idStation === formData.estacion)

        if (!selectedStation) {
            throw new Error("Debe seleccionar una estación válida.")
        }

        return {
            idVehicle: formData.id,
            vehicleType: formData.tipoVehiculo,
            color: formData.color,
            model: formData.modelo,
            station: {
                idStation: selectedStation.idStation,
                name: selectedStation.name,
                address: selectedStation.address,
                geoLocation: {
                    latitude: selectedStation.geoLocation.latitude,
                    longitude: selectedStation.geoLocation.longitude,
                    timestamp: selectedStation.geoLocation.timestamp,
                },
            },
            geolocation: {
                latitude: selectedStation.geoLocation.latitude,
                longitude: selectedStation.geoLocation.longitude,
                timestamp: selectedStation.geoLocation.timestamp,
            },
            maxUserWeight: parseFloat(formData.maxUsuarios || "0"),
            velocityMax: parseFloat(formData.velocidadMaxima || "0"),
            costForMinute: parseFloat(formData.costoPorMinuto || "0"),
            propities: {
                gears: formData.engranajes,
                hasBasket: formData.tieneCesta === "true" || formData.tieneCesta === true,
                deckSize: parseFloat(formData.tamanoCubierta || "0"),
                hasSeat: formData.tieneAsiento === "true" || formData.tieneAsiento === true,
                capacityBattery: parseFloat(formData.capacidadBateria || "0"),
                autonomyRange: parseFloat(formData.autonomiaRango || "0"),
                numberOfDoors: parseInt(formData.numeroPuertas || "0"),
                airConditioning: formData.tieneAireAcondicionado === "true" || formData.tieneAireAcondicionado === true,
                info: {
                    driveSystem: formData.drive,
                    Type: formData.brake,
                    bearingType: formData.bearing,
                },
            },
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const vehicleData = mapFormDataToVehicle(formData)
            await createVehicle(vehicleData)

            if (selectedImage) {
                await uploadVehicleImage(selectedImage, formData.id)
            }

            alert("Vehículo creado con éxito ✅")
            onClose()
        } catch (err) {
            console.error(err)
            alert("Error creando vehículo")
        }
    }

    const renderMechanicalSelect = (name: "drive" | "brake" | "bearing", label: string) => {
        const options =
            name === "drive"
                ? mechanicalTypes.drive
                : name === "brake"
                    ? mechanicalTypes.brake
                    : mechanicalTypes.bearing

        return (
            <div>
                <Label htmlFor={name} className="text-green-700 block mb-3">
                    {label}
                </Label>
                <Select value={(formData as any)[name]} onValueChange={(v) => handleInputChange(name, v)}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder={`Seleccionar ${label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(options).map(([key, val]) => (
                            <SelectItem key={key} value={val}>
                                {val}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )
    }

    const renderConditionalFields = () => (
        <VehicleFields
            formData={formData}
            handleInputChange={handleInputChange}
            renderMechanicalSelect={renderMechanicalSelect}
        />
    )

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

                    <div className="border-t border-green-200 pt-6">
                        <Label htmlFor="vehicleImage" className="text-green-700 block mb-3">
                            Imagen del Vehículo
                        </Label>
                        <Input
                            id="vehicleImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                            className="border-green-200 focus:border-green-500 cursor-pointer"
                        />

                    </div>
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
                                    <SelectValue placeholder="Seleccionar una estación . . ." />
                                </SelectTrigger>
                                <SelectContent>
                                    {estaciones.map((station) => (
                                        <SelectItem key={station.idStation} value={station.idStation}>
                                            {station.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Resto de campos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        <div>
                            <Label htmlFor="tipoVehiculo" className="text-green-700 block mb-3">
                                Tipo de Vehículo
                            </Label>
                            <Select value={formData.tipoVehiculo} onValueChange={(v) => handleInputChange("tipoVehiculo", v)}>
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

                    <div className="flex justify-end gap-3 pt-6 border-t border-green-200">
                        <Button type="button" variant="outline" onClick={onClose} className="border-green-300 text-green-600 hover:bg-green-50 bg-transparent">
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
