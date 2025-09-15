import { useState } from "react"
import { EcoSidebar } from "@/components/eco-sidebar"
import { WelcomeComponent } from "@/components/welcome"
import { Outlet } from "react-router-dom"

export default function DashboardPage() {
    const [selectedMenu, setSelectedMenu] = useState("home")

    const handleMenuSelect = (menu: string) => {
        setSelectedMenu(menu)
        console.log("[v0] Menu seleccionado:", menu)
    }

    const renderContent = () => {
        switch (selectedMenu) {
            case "home":
                return <WelcomeComponent />
            case "users":
                return (
                    <div className="flex-1 p-8">
                        <h2 className="text-2xl font-bold text-green-800">Gestión de Usuarios</h2>
                        <p className="text-green-600 mt-2">Funcionalidad en desarrollo...</p>
                    </div>
                )
            case "vehicles":
                return (
                    <div className="flex-1 p-8">
                        <h2 className="text-2xl font-bold text-green-800">Gestión de Vehículos</h2>
                        <p className="text-green-600 mt-2">Funcionalidad en desarrollo...</p>
                    </div>
                )
            case "stations":
                return (
                    <div className="flex-1 p-8">
                        <h2 className="text-2xl font-bold text-green-800">Gestión de Estaciones</h2>
                        <p className="text-green-600 mt-2">Funcionalidad en desarrollo...</p>
                    </div>
                )
            case "loans":
                return (
                    <div className="flex-1 p-8">
                        <h2 className="text-2xl font-bold text-green-800">Registrar Préstamo</h2>
                        <p className="text-green-600 mt-2">Funcionalidad en desarrollo...</p>
                    </div>
                )
            case "payments":
                return (
                    <div className="flex-1 p-8">
                        <h2 className="text-2xl font-bold text-green-800">Registrar Pago</h2>
                        <p className="text-green-600 mt-2">Funcionalidad en desarrollo...</p>
                    </div>
                )
            default:
                return <WelcomeComponent />
        }
    }

    return (
        <div className="flex h-screen bg-white">
            <EcoSidebar onMenuSelect={handleMenuSelect} />

            {renderContent()}
        </div>
    )
}
