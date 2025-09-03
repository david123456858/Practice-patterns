import type React from "react"
import { useState } from "react"
import { X, Car, FileText, DollarSign, Zap } from "lucide-react"

interface RegisterTypeVehicleModalProps {
    isOpen: boolean
    onClose: () => void
    onRegister: (typeVehicleData: { name: string; pricePerHour: number }) => void
}

export default function RegisterTypeVehicleModal({ isOpen, onClose, onRegister }: RegisterTypeVehicleModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        pricePerHour: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Vehicle type name is required"
        }

        if (!formData.pricePerHour.trim()) {
            newErrors.pricePerHour = "Price per hour is required"
        } else if (isNaN(Number(formData.pricePerHour)) || Number(formData.pricePerHour) <= 0) {
            newErrors.pricePerHour = "Please enter a valid price"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return;

        setIsSubmitting(true)

        try {
            await onRegister({
                name: formData.name.trim(),
                pricePerHour: Number(formData.pricePerHour),
            })

            // Reset form
            setFormData({
                name: "",
                pricePerHour: "",
            })
            setErrors({})
            onClose()
        } catch (error) {
            console.error("Error registering type vehicle:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            name: "",
            pricePerHour: "",
        })
        setErrors({})
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Register Type Vehicle</h2>
                    <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Vehicle Type Name */}
                    <div>
                        <div className="relative">
                            <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter vehicle type name"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Price Per Hour */}
                    <div>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 w-5" />
                            <input
                                type="number"
                                name="pricePerHour"
                                value={formData.pricePerHour}
                                onChange={handleInputChange}
                                placeholder="Cost for duration (USD)"
                                step="0.01"
                                min="0"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.pricePerHour ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </div>
                        {errors.pricePerHour && <p className="text-red-500 text-sm mt-1">{errors.pricePerHour}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}