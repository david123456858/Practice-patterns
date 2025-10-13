import { useState } from "react"
import { EcoSidebar } from "@/components/eco-sidebar"
import { WelcomeComponent } from "@/components/welcome"
import ManagementUser from "../management/user/managementUser"
import ManagementVehicle from "../management/vehicle/managementVehicle"
import { ManagementStation } from "../management/station/managementStation"
import ManagementLoan from "../management/loan/managementLoan"

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
                    <ManagementUser />
                )
            case "vehicles":
                return (
                    <ManagementVehicle />
                )
            case "stations":
                return (
                    <ManagementStation />
                )
            case "loans":
                return (
                    <ManagementLoan />
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
