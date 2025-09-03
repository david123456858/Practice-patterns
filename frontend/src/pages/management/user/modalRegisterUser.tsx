import type React from "react"
import { useState } from "react"
import { X, User, Mail, CreditCard, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscriptionOptions } from "@/services/user/userServices"

interface RegisterUserModalProps {
    isOpen: boolean
    onClose: () => void
    onRegister: (userData: {
        cc: string
        name: string
        email: string
        suscriptionId: string // Cambiado a suscriptionId para coincidir con el backend
    }) => void
}

export default function ModalRegisterUser({ isOpen, onClose, onRegister }: RegisterUserModalProps) {
    const [formData, setFormData] = useState({
        cc: "",
        name: "",
        email: "",
        suscriptionId: "", // Cambiado a suscriptionId
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.cc || !formData.name || !formData.email || !formData.suscriptionId) {
            setError("All fields are required")
            return
        }

        try {
            setLoading(true)
            setError(null)

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(formData.email)) {
                setError("Please enter a valid email address")
                return
            }

            // Llamar a la función onRegister con los datos del formulario
            onRegister({
                cc: formData.cc,
                name: formData.name,
                email: formData.email,
                suscriptionId: formData.suscriptionId
            })

            // Limpiar el formulario y cerrar el modal
            setFormData({ cc: "", name: "", email: "", suscriptionId: "" })
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error registering user')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setFormData({ cc: "", name: "", email: "", suscriptionId: "" })
        setError(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 ease-out">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Register User</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Enter identification number (CC)"
                            value={formData.cc}
                            onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
                            className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                            required
                        />
                    </div>

                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Crown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={formData.suscriptionId}
                            onChange={(e) => setFormData({ ...formData, suscriptionId: e.target.value })}
                            className="w-full pl-10 h-12 bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg appearance-none cursor-pointer"
                            required
                        >
                            <option value="">Select subscription type</option>
                            {subscriptionOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.displayName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            variant="outline"
                            className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
