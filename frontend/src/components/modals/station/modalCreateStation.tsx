import type React from "react"
import { useState } from "react"
import { X, MapPin, Navigation } from "lucide-react"
import { createStation } from "@/services/station/stationService"

interface geoLocation {
    latitude: number;
    longitude: number;
    timeStamp: Date;
}

interface RegisterStationModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void // Cambiado a onSuccess para notificar éxito
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

    // Función para generar ID aleatorio de 1 a 9 dígitos
    const generateRandomId = (): string => {
        const min = 100000000; // 9 dígitos (100,000,000)
        const max = 999999999; // 9 dígitos (999,999,999)
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNum.toString();
    }

    // Función para adquirir geolocalización
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

            // Llamar directamente al servicio
            await createStation(stationData)

            // Notificar éxito
            if (onSuccess) onSuccess()

            // Reset form
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
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Register Station</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
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
                            <label className="block text-sm font-medium text-gray-700">Station Name</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter station name"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Enter station address"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Geolocation Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Geolocation</label>

                            {!geoData ? (
                                <button
                                    type="button"
                                    onClick={acquireGeolocation}
                                    disabled={isGettingLocation}
                                    className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    <Navigation className="w-5 h-5 mr-2" />
                                    {isGettingLocation ? "Acquiring Location..." : "Acquire Geolocation"}
                                </button>
                            ) : (
                                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-700">Location Acquired</span>
                                        <button
                                            type="button"
                                            onClick={acquireGeolocation}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-gray-600">Latitude:</span>
                                            <span className="block font-medium">{geoData.latitude.toFixed(6)}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Longitude:</span>
                                            <span className="block font-medium">{geoData.longitude.toFixed(6)}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-gray-600">Timestamp:</span>
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
                                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!geoData || isSubmitting}
                                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Registering..." : "Register Station"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterStation