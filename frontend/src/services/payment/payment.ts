import { API_BASE_URL } from "../../config/api";

export const getPaymentMethods = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}payment`);
        if (!res.ok) throw new Error("Error al obtener métodos de pago");
        const data = await res.json();
        return Object.values(data.message); // ["EFECTIVE", "CREDIT_CARD"]
    } catch (err) {
        console.error("Error en getPaymentMethods:", err);
        return [];
    }
};

export const createPayment = async (payload: { loanId: string; amount: number; method: string }) => {
    try {
        const res = await fetch(`${API_BASE_URL}payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Error al procesar el pago");
        return await res.json();
    } catch (err) {
        console.error("Error en createPayment:", err);
        throw err;
    }
};
