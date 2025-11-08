//LOGICA ANTERIORMENTE PERTENECIENTE A HOMECLIENTPAGE
import { useState, useEffect } from "react"
import { getAvailableVehicles } from "@/services/vehicle/getVehicleAvailable"
import { createLoan } from "@/services/loan/loan"
import { type Vehicle } from "@/interface/vehicle/vehicleInterface"

export function useClientPage() {

    const [searchTerm, setSearchTerm] = useState("")
    const [reservedVehicles, setReservedVehicles] = useState<{ vehicleId: string; loanId: string }[]>([])
    const [reservationCode, setReservationCode] = useState("")
    const [showReservationModal, setShowReservationModal] = useState(false)

    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])

    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [paymentMethods, setPaymentMethods] = useState<string[]>([])
    const [selectedMethod, setSelectedMethod] = useState("")
    const [amount, setAmount] = useState<string>("")

    const [loanToPay, setLoanToPay] = useState<string | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUserData({
                name: parsedUser.userName,
                email: parsedUser.userEmail,
            })
        }
    }, [])

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getAvailableVehicles()
                setVehicles(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchVehicles()
    }, [])

    const filteredVehicles = vehicles.filter(
        v =>
            v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleReserveVehicle = async (vehicle: Vehicle) => {
        try {
            const storedUser = localStorage.getItem("user")
            if (!storedUser) throw new Error("Usuario no autenticado")
            const parsedUser = JSON.parse(storedUser)

            const payload = {
                loanId: Math.floor(100000 + Math.random() * 900000).toString(),
                userId: parsedUser.userId,
                vehicleId: vehicle.idVehicle,
                startStationId: vehicle.station.idStation,
            }

            await createLoan(payload)

            setReservedVehicles(prev => [...prev, { vehicleId: vehicle.idVehicle, loanId: payload.loanId }])
            setReservationCode(payload.loanId)
            setShowReservationModal(true)
        } catch {
            alert("Error al reservar vehículo")
        }
    }

    return {
        searchTerm,
        setSearchTerm,
        reservedVehicles,
        userData,
        vehicles,
        filteredVehicles,
        showReservationModal,
        setShowReservationModal,
        reservationCode,
        handleReserveVehicle,
        setReservedVehicles,
        showPaymentModal,
        setShowPaymentModal,
        paymentMethods,
        setPaymentMethods,
        selectedMethod,
        setSelectedMethod,
        amount,
        setAmount,
        loanToPay,
        setLoanToPay,
    }
}
