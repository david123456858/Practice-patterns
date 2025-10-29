"use client"

import { useState, useEffect } from "react"
import { getAvailableVehicles } from "@/services/vehicle/getVehicleAvailable"
import { createLoan } from "@/services/loan/loan"
import { type Vehicle } from "@/interface/vehicle/vehicleInterface"
import PaymentModal from "./modals/payment"
import ReservationModal from "./modals/reservation"
import HeaderClient from "./modals/headerClient"
import VehicleGrid from "./modals/vehicleGrid"

export default function ClientPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [reservedVehicles, setReservedVehicles] = useState<{ vehicleId: string; loanId: string }[]>([])
    const [reservationCode, setReservationCode] = useState("")
    const [showReservationModal, setShowReservationModal] = useState(false)

    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])

    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [p, setPaymentMethods] = useState<string[]>([])
    const [s, setSelectedMethod] = useState("")
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
                console.log("🚗 Vehículos recibidos:", data) // 👈 agrega esto

                setVehicles(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchVehicles()
    }, [])

    const filteredVehicles = vehicles.filter(
        (vehicle) =>
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
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
        } catch (err) {
            console.error(err)
            alert("Error al reservar vehículo")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <HeaderClient
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    userData={userData}
                    reservedVehicles={reservedVehicles}
                    vehicles={vehicles}
                    setReservedVehicles={setReservedVehicles}
                    setShowPaymentModal={setShowPaymentModal}
                    setLoanToPay={setLoanToPay}
                    setPaymentMethods={setPaymentMethods}
                    setAmount={setAmount}
                />

                {/* Grid de vehículos */}
                <VehicleGrid
                    vehicles={filteredVehicles}
                    reservedVehicles={reservedVehicles}
                    onReserve={handleReserveVehicle}
                />

                {/* Modal de reserva */}
                <ReservationModal
                    open={showReservationModal}
                    onClose={() => setShowReservationModal(false)}
                    reservationCode={reservationCode}
                />

                {/* Modal de pago */}
                <PaymentModal
                    open={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    loanToPay={loanToPay}
                    amount={amount}
                    onPaymentSuccess={() => {
                        setShowPaymentModal(false)
                        setLoanToPay(null)
                        setSelectedMethod("")
                        setAmount("")
                    }}
                />
            </div>
        </div>
    )
}
