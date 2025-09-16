"use client"

import { useState } from "react"
import { Leaf, Zap, Home, Users, Car, MapPin, FileText, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

interface EcoSidebarProps {
    onMenuSelect?: (menu: string) => void
}

const menuItems = [
    { id: "home", label: "Página principal", icon: Home },
    { id: "users", label: "Gestión de usuarios", icon: Users },
    { id: "vehicles", label: "Gestión de vehículos", icon: Car },
    { id: "stations", label: "Gestión de estaciones", icon: MapPin },
    { id: "loans", label: "Registrar préstamo", icon: FileText },
    { id: "payments", label: "Registrar pago", icon: CreditCard },
]

export function EcoSidebar({ onMenuSelect }: EcoSidebarProps) {
    const [selectedItem, setSelectedItem] = useState("home")

    const handleItemClick = (itemId: string) => {
        setSelectedItem(itemId)
        onMenuSelect?.(itemId)
    }

    return (
        <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-green-50 to-green-100 border-r border-green-200">
            {/* Header */}
            <div className="flex items-center gap-3 p-6 border-b border-green-200">
                <div className="flex items-center gap-1">
                    <div className="relative">
                        <Leaf className="h-8 w-8 text-green-600" />
                        <Zap className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-green-800">EcoMove</h1>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleItemClick(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                                        "hover:bg-green-200/50 hover:text-green-800",
                                        selectedItem === item.id ? "bg-green-600 text-white shadow-md" : "text-green-700",
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-green-200">
                <div className="text-center text-sm text-green-600">
                    <p className="font-medium">Movilidad Sostenible</p>
                    <p className="text-green-500">Versión 1.0</p>
                </div>
            </div>
        </div>
    )
}
