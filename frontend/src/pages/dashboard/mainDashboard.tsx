import { Home, Users, Car, MapPin, FileText, CreditCard } from "lucide-react"
import { Link, Outlet } from "react-router-dom"
import { useState } from "react"
import RegisterStation from "../register/station/registerStation"

function MainDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleRegisterStation = (stationData: { address: string }) => {
        console.log("Nueva estación registrada:", stationData)
    }

    return (
        <>
            <div className="flex h-screen bg-white">
                {/* Sidebar */}
                <div className="w-64 bg-green-600 text-white shadow-xl">
                    <div className="p-6 border-b border-green-500">
                        <h1 className="text-2xl font-bold text-yellow-300">EcoMove</h1>
                    </div>

                    <nav className="mt-6">
                        <div className="px-4 space-y-2">
                            <Link to={"/welcome"}>
                                <a href="#" className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors">
                                    <Home className="w-5 h-5 mr-3" />
                                    <span className="font-medium">Main Dashboard</span>
                                </a>
                            </Link>

                            <Link to={"/users"}>
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
                                >
                                    <Users className="w-5 h-5 mr-3" />
                                    <span>Management User</span>
                                </a>
                            </Link>

                            <Link to={"/vehicles"}>
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
                                >
                                    <Car className="w-5 h-5 mr-3" />
                                    <span>Management Vehicle</span>
                                </a>
                            </Link>

                            <Link to={"/loan"}>
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
                                >
                                    <FileText className="w-5 h-5 mr-3" />
                                    <span>Management Loan</span>
                                </a>
                            </Link>

                            <a
                                onClick={() => setIsModalOpen(true)}
                                href="#"
                                className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
                            >
                                <MapPin className="w-5 h-5 mr-3" />
                                <span>Register Stations</span>
                            </a>

                            <a
                                href="#"
                                className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
                            >
                                <CreditCard className="w-5 h-5 mr-3" />
                                <span>Register Payment</span>
                            </a>

                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Content Area */}
                    <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200">

                            {/* Welcome Content */}
                            <div className="p-8">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>

                <RegisterStation
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onRegister={handleRegisterStation}
                />
            </div>
        </>
    )
}

export default MainDashboard
