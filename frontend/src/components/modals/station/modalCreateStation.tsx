import type React from "react"
import { useState } from "react"
import { X, MapPin, Navigation } from "lucide-react"
import { createStation } from "@/services/station/station"

interface geoLocation {
    latitude: number;
    longitude: number;
    timeStamp: Date;
}

interface RegisterStationModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

function RegisterStation({ isOpen, onClose, onSuccess }: RegisterStationModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        address: ""
    })
    const [geoData, setGeoData] = useState<geoLocation | null>(null)
    const [isGettingLocation, setIsGettingLocation] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const generateRandomId = (): string => {
        const min = 100000000; 
        const max = 999999999; 
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNum.toString();
    }

    const acquireGeolocation = async (): Promise<void> => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser")
            return
        }

        setIsGettingLocation(true)
        setError(null)

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                })
            })

            const geoLocation: geoLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timeStamp: new Date()
            }

            setGeoData(geoLocation)
        } catch (err) {
            const error = err as GeolocationPositionError
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setError("Location access denied. Please enable location permissions.")
                    break
                case error.POSITION_UNAVAILABLE:
                    setError("Location information is unavailable.")
                    break
                case error.TIMEOUT:
                    setError("Location request timed out. Please try again.")
                    break
                default:
                    setError("An unknown error occurred while getting location.")
            }
        } finally {
            setIsGettingLocation(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.address.trim()) {
            setError("Station name and address are required")
            return
        }

        if (!geoData) {
            setError("Please acquire geolocation first")
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const stationData = {
                id: generateRandomId(),
                name: formData.name.trim(),
                address: formData.address.trim(),
                geoLocation: geoData
            }

            await createStation(stationData)

            if (onSuccess) onSuccess()

            setFormData({ name: "", address: "" })
            setGeoData(null)
            onClose()

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create station")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        setFormData({ name: "", address: "" })
        setGeoData(null)
        setError(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 scale-100">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-green-200">
                        <h2 className="text-xl font-semibold text-green-800">Registrar Estación</h2>
                        <button
                            onClick={onClose}
                            className="text-green-400 hover:text-green-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        {/* Station Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-green-700">Nombre de la estación</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ingresa el nombre de la estación"
                                    className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-green-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-green-700">Dirección</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Ingresa la dirección de la estación"
                                    className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-green-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Geolocation Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-green-700">Geolocalización</label>

                            {!geoData ? (
                                <button
                                    type="button"
                                    onClick={acquireGeolocation}
                                    disabled={isGettingLocation}
                                    className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium disabled:bg-green-400 disabled:cursor-not-allowed"
                                >
                                    <Navigation className="w-5 h-5 mr-2" />
                                    {isGettingLocation ? "Obteniendo ubicación..." : "Obtener geolocalización"}
                                </button>
                            ) : (
                                <div className="p-4 bg-green-50 rounded-lg space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-green-700">Ubicación obtenida</span>
                                        <button
                                            type="button"
                                            onClick={acquireGeolocation}
                                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-green-600">Latitud:</span>
                                            <span className="block font-medium">{geoData.latitude.toFixed(6)}</span>
                                        </div>
                                        <div>
                                            <span className="text-green-600">Longitud:</span>
                                            <span className="block font-medium">{geoData.longitude.toFixed(6)}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-green-600">Fecha:</span>
                                            <span className="block font-medium">{geoData.timeStamp.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={!geoData || isSubmitting}
                                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Registrando..." : "Registrar estación"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterStation