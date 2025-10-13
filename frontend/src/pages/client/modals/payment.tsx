"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { getPaymentMethods, createPayment } from "@/services/payment/payment"

interface PaymentModalProps {
    open: boolean
    onClose: () => void
    loanToPay: string | null
    amount: string
    onPaymentSuccess: () => void
}

export default function PaymentModal({
    open,
    onClose,
    loanToPay,
    amount,
    onPaymentSuccess,
}: PaymentModalProps) {
    const [paymentMethods, setPaymentMethods] = useState<string[]>([])
    const [selectedMethod, setSelectedMethod] = useState("")

    useEffect(() => {
        if (open) {
            const fetchMethods = async () => {
                try {
                    const methods = await getPaymentMethods()
                    setPaymentMethods(methods)
                } catch (err) {
                    console.error("Error cargando métodos de pago:", err)
                }
            }
            fetchMethods()
        }
    }, [open])

    const handlePayment = async () => {
        if (!loanToPay) return
        if (!amount || !selectedMethod) {
            alert("Debes seleccionar un método de pago")
            return
        }

        try {
            const numericAmount = parseFloat(amount) || 0
            await createPayment({
                loanId: loanToPay,
                amount: numericAmount,
                method: selectedMethod,
            })

            alert("Pago realizado con éxito ✅")
            onPaymentSuccess()
            onClose()
        } catch (err) {
            console.error(err)
            alert("Error procesando el pago")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-primary">Realizar Pago</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Para finalizar la devolución del vehículo, debe realizar el pago.
                    </p>

                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">El valor del monto a pagar es:</p>
                        <p className="text-xl font-bold text-primary">{amount} COP</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Método de Pago</label>
                        <select
                            value={selectedMethod}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                        >
                            <option value="">Seleccione un método</option>
                            {paymentMethods.map((method) => (
                                <option key={method} value={method}>
                                    {method}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        onClick={handlePayment}
                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md"
                    >
                        Confirmar Pago
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
