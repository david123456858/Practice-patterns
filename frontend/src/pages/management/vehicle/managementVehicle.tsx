import { Car, MapPin, Clock, DollarSign, Plus, Search, Filter } from "lucide-react"
import RegisterTypeVehicleModal from "@/pages/register/vehicle/registerTypeVehicle";
import { getTypeVehicles, type TypeVehicle } from "@/services/vehicle/vehicleService";
import { useState, useEffect } from "react";

interface Vehicle {
    id: string;
    station: string;
    nameVehicle: string;
    status: "Available" | "In Use" | "Maintenance" | "Reserved";
    costForDuration: number;
}

function ManagementVehicle() {
    const [isTypeVehicleModalOpen, setIsTypeVehicleModalOpen] = useState(false);
    const [typeVehicles, setTypeVehicles] = useState<TypeVehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Sample data - replace with your actual data source
    const sampleVehicles: Vehicle[] = [
        {
            id: "1",
            station: "Central Station",
            nameVehicle: "EcoBike-001",
            status: "Available",
            costForDuration: 15.5,
        },
        {
            id: "2",
            station: "North Plaza",
            nameVehicle: "EcoScooter-045",
            status: "In Use",
            costForDuration: 22.0,
        },
        // ... otros vehículos
    ];

    // Cargar tipos de vehículos al montar el componente
    useEffect(() => {
        fetchTypeVehicles();
    }, []);

    const fetchTypeVehicles = async () => {
        try {
            setLoading(true);
            const typeVehiclesData = await getTypeVehicles();
            setTypeVehicles(typeVehiclesData);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar tipos de vehículos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterTypeVehicle = async (typeVehicleData: any) => {
        try {
            // En una implementación real, usarías el servicio createTypeVehicle
            // await createTypeVehicle({
            //   name: typeVehicleData.name,
            //   costForDuration: typeVehicleData.pricePerHour
            // });

            // Por ahora simulamos la creación
            const newTypeVehicle: TypeVehicle = {
                name: typeVehicleData.name,
                costForDuration: typeVehicleData.pricePerHour
            };

            setTypeVehicles(prev => [...prev, newTypeVehicle]);
            setIsTypeVehicleModalOpen(false);

            console.log("Type vehicle created:", newTypeVehicle);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear tipo de vehículo');
            console.error(err);
        }
    };

    const getStatusColor = (status: Vehicle["status"]) => {
        switch (status) {
            case "Available":
                return "bg-green-100 text-green-800 border-green-200";
            case "In Use":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Maintenance":
                return "bg-red-100 text-red-800 border-red-200";
            case "Reserved":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };


    return (
        <>
            <div className="space-y-6">
                {/* Header with actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-green-800">Vehicle Management</h2>
                        <p className="text-gray-600 mt-1">Manage and monitor all vehicles in the system</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search vehicles..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Plus className="h-4 w-4" />
                            Add Vehicle
                        </button>

                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => setIsTypeVehicleModalOpen(true)}
                        >
                            <Plus className="h-4 w-4" />
                            Add Type Vehicle
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Car className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Vehicles</p>
                                <p className="text-xl font-semibold text-gray-900">124</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <MapPin className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Available</p>
                                <p className="text-xl font-semibold text-gray-900">89</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">In Use</p>
                                <p className="text-xl font-semibold text-gray-900">28</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Revenue Today</p>
                                <p className="text-xl font-semibold text-gray-900">$1,247</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type Vehicles Section
                {typeVehicles.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Vehicle Types</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {typeVehicles.map((type, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-gray-900">{type.name}</h4>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            ${type.costForDuration.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Cost per duration</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}

                {/* Vehicles Table */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Station</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name Vehicle</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cost For Duration</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sampleVehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                {vehicle.station}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <Car className="h-4 w-4 text-gray-400" />
                                                {vehicle.nameVehicle}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(vehicle.status)}`}
                                            >
                                                {vehicle.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4 text-gray-400" />
                                                {vehicle.costForDuration.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <button className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                                                <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">Showing 1 to 4 of 124 vehicles</p>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1 text-sm bg-green-600 text-white rounded">1</button>
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Type Vehicle Modal */}
            <RegisterTypeVehicleModal
                isOpen={isTypeVehicleModalOpen}
                onClose={() => setIsTypeVehicleModalOpen(false)}
                onRegister={handleRegisterTypeVehicle}
            />
        </>
    );
}

export default ManagementVehicle;