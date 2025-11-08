import { useEffect, useState } from "react"
import { getLoans } from "@/services/loan/loan"
import type { Loan } from "@/interface/loan/loan"

export function useManagementLoan() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [loans, setLoans] = useState<Loan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchLoans = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getLoans()
            setLoans(data)

        } catch (err) {
            console.error("Error cargando préstamos:", err)
            setError(err instanceof Error ? err.message : "Error al cargar los préstamos")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLoans()
    }, [])

    const filteredLoans = loans.filter((loan) => {
        const matchesSearch =
            loan.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.vehicleId.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || loan.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-100 text-green-800"
            case "COMPLETED":
                return "bg-blue-100 text-blue-800"
            case "CANCELED":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(amount)
    }

    return {
        loans,
        filteredLoans,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        fetchLoans,
        getStatusColor,
        formatDateTime,
        formatCurrency,
    }
}
