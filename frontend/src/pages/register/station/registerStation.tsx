import type React from "react"
import { useState } from "react"
import { X, MapPin } from "lucide-react"

interface RegisterStationModalProps {
    isOpen: boolean
    onClose: () => void
    onRegister: (stationData: { address: string }) => void
}

function RegisterStation({ isOpen, onClose, onRegister }: RegisterStationModalProps) {
    const [address, setAddress] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (address.trim()) {
            onRegister({ address: address.trim() })
            setAddress("")
            onClose()
        }
    }

    const handleCancel = () => {
        setAddress("")
        onClose()
    }

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 scale-100">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Register Stations</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Address Field */}
                        <div className="space-y-2">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="enter your address"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    required
                                />
                            </div>
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
                                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterStation