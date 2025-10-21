import { API_BASE_URL } from "@/config/api"

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
        const response = await fetch(`${API_BASE_URL}loan`)
        if (!response.ok) throw new Error("Error al traer préstamos")
        const data = await response.json()
        return data.message
    } catch (error) {
        console.error("Error en getLoans:", error)
        throw error
    }
}

export interface LoanPayload {
    loanId: string;
    userId: string;
    vehicleId: string;
    startStationId: string;
}

export const createLoan = async (loanData: Omit<LoanPayload, "userId">) => {
    try {
        // ✅ Traemos al usuario desde localStorage
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user?.userId) {
            throw new Error("No hay usuario logueado.");
        }

        const payload: LoanPayload = {
            ...loanData,
            userId: user.userId, // ✅ ahora sí se manda el userId
        };

        const response = await fetch(`${API_BASE_URL}loan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Error creando la reserva");
        }

        return await response.json();
    } catch (err) {
        console.error("Error en createLoan:", err);
        throw err;
    }
};

interface ReturnVehiclePayload {
    loanId: string;
    endStationId: string;
}

export const returnVehicle = async (payload: ReturnVehiclePayload) => {
    try {
        const response = await fetch(`${API_BASE_URL}loan`, {
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