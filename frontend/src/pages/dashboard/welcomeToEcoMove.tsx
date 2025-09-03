import { Users, Car, MapPin } from "lucide-react"

function WelcomeToEcomove() {
    return (
        <>
            <div className="text-center mt-31 mb-31">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <Car className="w-12 h-12 text-green-700" />
                </div>

                <h3 className="text-3xl font-bold text-green-800 mb-4">Welcome to EvoMove Software</h3>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Advanced platform for designing sustainable mobility patterns and managing eco-friendly transportation
                    solutions
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-green-800 mb-2">Vehicle Management</h4>
                        <p className="text-sm text-gray-600">Efficiently manage your eco-friendly vehicle fleet</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Users className="w-6 h-6 text-green-700" />
                        </div>
                        <h4 className="font-semibold text-green-800 mb-2">User Control</h4>
                        <p className="text-sm text-gray-600">Comprehensive user management and analytics</p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-green-800 mb-2">Station Network</h4>
                        <p className="text-sm text-gray-600">Monitor and optimize charging station locations</p>
                    </div>
                </div>

                <div className="mt-8">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </>
    )
}

export default WelcomeToEcomove