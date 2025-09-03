import type React from "react"
import { useState } from "react"
import { X, User, Mail, CreditCard, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RegisterUserModalProps {
    isOpen: boolean
    onClose: () => void
    onRegister: (userData: {
        cc: string
        name: string
        email: string
        subscription: any
    }) => void
}

export default function ModalRegisterUser({ isOpen, onClose, onRegister }: RegisterUserModalProps) {
    const [formData, setFormData] = useState({
        cc: "",
        name: "",
        email: "",
        subscription: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.cc && formData.name && formData.email && formData.subscription) {
            onRegister(formData)
            setFormData({ cc: "", name: "", email: "", subscription: "" })
            onClose()
        }
    }

    const handleCancel = () => {
        setFormData({ cc: "", name: "", email: "", subscription: "" })
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
                            placeholder="Enter your CC"
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
                            placeholder="Enter your name"
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
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Crown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={formData.subscription}
                            onChange={(e) => setFormData({ ...formData, subscription: e.target.value })}
                            className="w-full pl-10 h-12 bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg appearance-none cursor-pointer"
                            required
                        >
                            <option value="">Select your subscription</option>
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                            <option value="Pro">Pro</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            variant="outline"
                            className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
