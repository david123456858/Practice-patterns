// LOGICA TRANSFERIDA AL USEREGISTERSTATIONS
import { X, MapPin, Navigation } from "lucide-react"
import { useRegisterStation } from "@/hooks/station/useRegisterStation"

interface RegisterStationModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

function RegisterStation({ isOpen, onClose, onSuccess }: RegisterStationModalProps) {
    const {
        formData,
        setFormData,
        geoData,
        acquireGeolocation,
        isGettingLocation,
        isSubmitting,
        error,
        handleSubmit,
        handleCancel,
    } = useRegisterStation(onSuccess, onClose)

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-green-200">
                        <h2 className="text-xl font-semibold text-green-800">Registrar Estación</h2>
                        <button onClick={onClose} className="text-green-400 hover:text-green-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>
                        )}

                        {/* Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-green-700">Nombre</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Nombre de la estación"
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-green-700">Dirección</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                    placeholder="Dirección"
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Geolocation */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-green-700">Geolocalización</label>

                            {!geoData ? (
                                <button
                                    type="button"
                                    onClick={acquireGeolocation}
                                    disabled={isGettingLocation}
                                    className="w-full flex justify-center items-center px-4 py-3 bg-green-600 text-white rounded-lg"
                                >
                                    <Navigation className="w-5 h-5 mr-2" />
                                    {isGettingLocation ? "Obteniendo ubicación..." : "Obtener geolocalización"}
                                </button>
                            ) : (
                                <div className="p-4 bg-green-50 rounded-lg text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Ubicación obtenida</span>
                                        <button
                                            type="button"
                                            onClick={acquireGeolocation}
                                            className="text-green-700 hover:underline"
                                        >
                                            Actualizar
                                        </button>
                                    </div>

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <div>
                                            <span className="text-green-600">Latitud:</span>
                                            <p className="font-medium">{geoData.latitude.toFixed(6)}</p>
                                        </div>
                                        <div>
                                            <span className="text-green-600">Longitud:</span>
                                            <p className="font-medium">{geoData.longitude.toFixed(6)}</p>
                                        </div>
                                    </div>

                                    <p className="mt-1 text-green-600">
                                        Fecha: {geoData.timestamp.toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 py-3 bg-green-100 rounded-lg"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={!geoData || isSubmitting}
                                className="flex-1 py-3 bg-green-600 text-white rounded-lg"
                            >
                                {isSubmitting ? "Registrando..." : "Registrar estación"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            )
        </>
    )
}

export default RegisterStation