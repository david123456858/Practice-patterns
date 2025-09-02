import { Search, X, Home, Users, Car, MapPin, FileText, CreditCard } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

function MainDashboard() {
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
                                <a href="#" className="flex items-center px-4 py-3 text-white bg-green-700 rounded-lg shadow-sm">
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

                            <Link to={"/stations"}>
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
                                >
                                    <MapPin className="w-5 h-5 mr-3" />
                                    <span>Management Stations</span>
                                </a>
                            </Link>

                            <Link to={"/loan"}>
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
                                >
                                    <FileText className="w-5 h-5 mr-3" />
                                    <span>Register Loan</span>
                                </a>
                            </Link>

                            <Link to="/payment">
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
                                >
                                    <CreditCard className="w-5 h-5 mr-3" />
                                    <span>Register Payment</span>
                                </a>
                            </Link>

                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Top Bar */}
                    <header className="bg-yellow-400 shadow-md border-b-2 border-yellow-500">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-green-800 font-medium">Dashboard</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button className="p-2 text-green-700 hover:bg-yellow-300 rounded-lg transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-green-700 hover:bg-yellow-300 rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <main className="flex-1 p-6 bg-gray-50">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                            {/* Page Header */}
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-green-800">Main Dashboard</h2>
                            </div>

                            {/* Tabs */}
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex space-x-1">
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium shadow-sm">Vehicle</button>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-green-700 rounded-lg font-medium transition-colors">
                                        User
                                    </button>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-green-700 rounded-lg font-medium transition-colors">
                                        Loan History
                                    </button>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-green-700 rounded-lg font-medium transition-colors">
                                        Select station
                                    </button>
                                </div>
                            </div>

                            {/* Welcome Content */}
                            <div className="p-8">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default MainDashboard
