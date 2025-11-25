
import { getAllVehicles } from "../vehicle/getAllVehicle";
import type { Loan, LoanPayload } from "@/interface/loan/loan";

export const createLoan = async (loanData: Omit<LoanPayload, "userId" | "startStationId">) => {
    try {
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
            loanId: loanData.loanId,
        };

        const response = await fetch(`/api/v1/loan`, {
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

export const getLoans = async (): Promise<Loan[]> => {
    try {
        const response = await fetch(`/api/v1/loan`);
        if (!response.ok) throw new Error("Error al traer préstamos");

        const data = await response.json();
        return data.message as Loan[];
    } catch (error) {
        console.error("Error en getLoans:", error);
        throw error;
    }
};


interface ReturnVehiclePayload {
    loanId: string;
    endStationId: string;
}

export const returnVehicle = async (payload: ReturnVehiclePayload) => {
    try {
        const response = await fetch(`/api/v1/loan`, {
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