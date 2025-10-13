"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

interface ReservationModalProps {
    open: boolean
    onClose: () => void
    reservationCode: string
}

export default function ReservationModal({
    open,
    onClose,
    reservationCode,
}: ReservationModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5 text-primary" />
                        Reserva Confirmada
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 text-center">
                    {/* Mensaje informativo */}
                    <p className="text-sm text-muted-foreground">
                        Este código es de un solo uso. Por favor, acérquese a la estación de EcoMove más cercana y,
                        cuando reciba su vehículo, presione{" "}
                        <span className="font-medium text-primary">"Aceptar"</span>.
                    </p>

                    <div className="bg-primary/10 p-6 rounded-lg">
                        <p className="text-2xl font-bold text-primary tracking-wider">{reservationCode}</p>
                    </div>

                    <Button
                        onClick={onClose}
                        className="w-full bg-primary hover:bg-primary/90"
                    >
                        Aceptar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
