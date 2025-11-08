import { useEffect, useMemo, useState } from "react"
import { getAllVehicles } from "@/services/vehicle/getAllVehicle"
import type { Vehicle } from "@/interface/vehicle/vehicleInterface"

export function useManagementVehicle() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchVehicles = async () => {
        try {
            setLoading(true)
            const data = await getAllVehicles()
            setVehicles(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar los vehículos")
            console.error("Error fetching vehicles:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVehicles()
    }, [])

    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle) => {
            const matchesSearch =
                vehicle.idVehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.station.idStation.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || vehicle.state === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [searchTerm, statusFilter, vehicles])

    const getStatusBadge = (estado: string) => {
        switch (estado) {
            case "AVAILABLE":
                return "bg-green-100 text-green-800"
            case "IN_USE":
                return "bg-blue-100 text-blue-800"
            case "MAINTENANCE":
                return "bg-yellow-100 text-yellow-800"
            case "OUT_OF_SERVICE":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    return {
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        isModalOpen,
        setIsModalOpen,
        filteredVehicles,
        loading,
        error,
        fetchVehicles,
        getStatusBadge,
    }
}
