import type React from "react"
import { useState } from "react"
import { X, User, Car, MapPin, Clock } from "lucide-react"

interface RegisterLoanModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (loanData: {
        userId: string
        vehicleId: string
        stationOrigin: string
        stationDestine: string
    }) => void
}

export default function ModalRegisterLoan({ isOpen, onClose, onSubmit }: RegisterLoanModalProps) {
    const [formData, setFormData] = useState({
        userId: "",
        vehicleId: "",
        stationOrigin: "",
        stationDestine: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    // Mock data for selects
    const users = [
        { id: "1", name: "John Smith", cc: "12345678" },
        { id: "2", name: "Sarah Johnson", cc: "87654321" },
        { id: "3", name: "Mike Davis", cc: "11223344" },
    ]

    const vehicles = [
        { id: "1", name: "EcoBike-001", type: "Electric Bike" },
        { id: "2", name: "EcoScooter-002", type: "Electric Scooter" },
        { id: "3", name: "EcoBike-003", type: "Electric Bike" },
    ]

    const stations = [
        { id: "1", name: "Central Station", location: "Downtown" },
        { id: "2", name: "Park Station", location: "City Park" },
        { id: "3", name: "Mall Station", location: "Shopping Center" },
        { id: "4", name: "University Station", location: "Campus" },
    ]

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.userId) newErrors.userId = "Please select a user"
        if (!formData.vehicleId) newErrors.vehicleId = "Please select a vehicle"
        if (!formData.stationOrigin) newErrors.stationOrigin = "Please select origin station"
        if (!formData.stationDestine) newErrors.stationDestine = "Please select destination station"
        if (formData.stationOrigin === formData.stationDestine && formData.stationOrigin) {
            newErrors.stationDestine = "Destination must be different from origin"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
            setFormData({
                userId: "",
                vehicleId: "",
                stationOrigin: "",
                stationDestine: "",
            })
            onClose()
        }
    }

    const handleCancel = () => {
        setFormData({
            userId: "",
            vehicleId: "",
            stationOrigin: "",
            stationDestine: "",
        })
        setErrors({})
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Register Loan</h2>
                    <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Select User */}
                    <div>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={formData.userId}
                                onChange={(e) => handleInputChange("userId", e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.userId ? "border-red-500" : "border-gray-300"
                                    } bg-gray-50 text-gray-700`}
                            >
                                <option value="">Select user</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} - CC: {user.cc}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
                    </div>

                    {/* Select Vehicle */}
                    <div>
                        <div className="relative">
                            <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={formData.vehicleId}
                                onChange={(e) => handleInputChange("vehicleId", e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.vehicleId ? "border-red-500" : "border-gray-300"
                                    } bg-gray-50 text-gray-700`}
                            >
                                <option value="">Select Vehicle</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.name} - {vehicle.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.vehicleId && <p className="text-red-500 text-sm mt-1">{errors.vehicleId}</p>}
                    </div>

                    {/* Select Station Origin */}
                    <div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={formData.stationOrigin}
                                onChange={(e) => handleInputChange("stationOrigin", e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.stationOrigin ? "border-red-500" : "border-gray-300"
                                    } bg-gray-50 text-gray-700`}
                            >
                                <option value="">Select StationOrigin</option>
                                {stations.map((station) => (
                                    <option key={station.id} value={station.id}>
                                        {station.name} - {station.location}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.stationOrigin && <p className="text-red-500 text-sm mt-1">{errors.stationOrigin}</p>}
                    </div>

                    {/* Select Station Destine */}
                    <div>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={formData.stationDestine}
                                onChange={(e) => handleInputChange("stationDestine", e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.stationDestine ? "border-red-500" : "border-gray-300"
                                    } bg-gray-50 text-gray-700`}
                            >
                                <option value="">Select StationDestine</option>
                                {stations.map((station) => (
                                    <option key={station.id} value={station.id}>
                                        {station.name} - {station.location}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.stationDestine && <p className="text-red-500 text-sm mt-1">{errors.stationDestine}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}