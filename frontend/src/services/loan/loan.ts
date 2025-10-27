import { VITE_API_URL } from "@/config/api"
import { getAllVehicles } from "../vehicle/getAllVehicle";

export interface LoanPayload {
    loanId: string;
    userId: string;
    vehicleId: string;
    startStationId: string;
}

export const createLoan = async (loanData: Omit<LoanPayload, "userId" | "startStationId">) => {
    try {
        // ✅ Obtener usuario logueado
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user?.userId) {
            throw new Error("No hay usuario logueado.");
        }

        const vehicles = await getAllVehicles();
        const selectedVehicle = vehicles.find(v => v.idVehicle === loanData.vehicleId);

        if (!selectedVehicle) {
            throw new Error("Vehículo no encontrado.");
        }

        const payload: LoanPayload = {
            ...loanData,
            userId: user.userId,
            startStationId: selectedVehicle.stationId, 
        };

        console.log("📦 Enviando payload al backend:", payload);

        const response = await fetch(`${VITE_API_URL}loan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error("❌ Error creando la reserva:", response);
            throw new Error("Error creando la reserva");
        }

        return await response.json();
    } catch (err) {
        console.error("Error en createLoan:", err);
        throw err;
    }
};

export interface Loan {
    loanId: string
    userId: string
    vehicleId: string
    startTime: string
    endTime: string
    startStationId: string
    endStationId: string | null
    status: "ACTIVE" | "COMPLETED" | "CANCELED"
    cost: number
}

export const getLoans = async (): Promise<Loan[]> => {
    try {
        const response = await fetch(`${VITE_API_URL}loan`)
        if (!response.ok) throw new Error("Error al traer préstamos")
        const data = await response.json()
        return data.message
    } catch (error) {
        console.error("Error en getLoans:", error)
        throw error
    }
}

interface ReturnVehiclePayload {
    loanId: string;
    endStationId: string;
}

export const returnVehicle = async (payload: ReturnVehiclePayload) => {
    try {
        const response = await fetch(`${VITE_API_URL}loan`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.message;
    } catch (err) {
        console.error("Error devolviendo vehículo:", err);
        throw err;
    }
};