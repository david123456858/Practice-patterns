export interface LoanBase {
    loanId: string;
    userId: string;
    vehicleId: string;
    startStationId: string;
    endStationId?: string | null;
}

export interface LoanPayload extends Omit<LoanBase, "endStationId"> { }

export interface Loan extends LoanBase {
    startTime: string;
    endTime: string;
    status: "ACTIVE" | "COMPLETED" | "CANCELED";
    cost: number;
}
