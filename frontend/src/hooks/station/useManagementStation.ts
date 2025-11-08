import { useEffect, useMemo, useState } from "react"
import { getStations } from "@/services/station/station"
import type { Station } from "@/interface/station/station"

export function useManagementStation() {
    const [stations, setStations] = useState<Station[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchStations = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getStations()
            setStations(data)

        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar las estaciones")
            console.error("Error fetching stations:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStations()
    }, [refreshTrigger])

    const filteredStations = useMemo(() => {
        if (!searchTerm) return stations

        const term = searchTerm.toLowerCase()

        return stations.filter(station =>
            station.idStation.toLowerCase().includes(term) ||
            station.name.toLowerCase().includes(term) ||
            station.address.toLowerCase().includes(term)
        )
    }, [searchTerm, stations])

    const handleStationCreated = () => {
        setIsModalOpen(false)
        setRefreshTrigger(prev => prev + 1)
    }

    return {
        stations,
        filteredStations,
        searchTerm,
        setSearchTerm,
        isModalOpen,
        setIsModalOpen,
        handleStationCreated,
        loading,
        error,
        fetchStations,
    }
}
