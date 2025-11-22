"use client"
//LOGICA TRANSFERIDA AL USECLIENTPAGE.TS
import PaymentModal from "./modals/payment"
import ReservationModal from "./modals/reservation"
import HeaderClient from "./modals/headerClient"
import VehicleGrid from "./modals/vehicleGrid"
import { useClientPage } from "@/hooks/client/useClientPage"

export default function ClientPage() {
    const state = useClientPage()

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <HeaderClient
                    searchTerm={state.searchTerm}
                    setSearchTerm={state.setSearchTerm}
                    userData={state.userData}
                    reservedVehicles={state.reservedVehicles}
                    vehicles={state.vehicles}
                    setReservedVehicles={state.setReservedVehicles}
                    setShowPaymentModal={state.setShowPaymentModal}
                    setLoanToPay={state.setLoanToPay}
                    setPaymentMethods={state.setPaymentMethods}
                    setAmount={state.setAmount}
                />

                {/* Grid de vehículos */}
                <VehicleGrid
                    vehicles={state.filteredVehicles}
                    reservedVehicles={state.reservedVehicles}
                    onReserve={state.handleReserveVehicle}
                />

                {/* Modal de reserva */}
                <ReservationModal
                    open={state.showReservationModal}
                    onClose={() => state.setShowReservationModal(false)}
                    reservationCode={state.reservationCode}
                />

                {/* Modal de pago */}

                <PaymentModal
                    open={state.showPaymentModal}
                    onClose={() => state.setShowPaymentModal(false)}
                    loanToPay={state.loanToPay}
                    amount={state.amount}
                    onPaymentSuccess={() => {
                        state.setShowPaymentModal(false)
                        state.setLoanToPay(null)
                        state.setAmount("")
                    }}
                />
            </div>
        </div>
    )
}
