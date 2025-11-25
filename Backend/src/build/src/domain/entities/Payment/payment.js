"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
class Payment {
    constructor(paymentId, loanId, amount, Status, paymethod, paymentDate) {
        this.paymentId = paymentId;
        this.loanId = loanId;
        this.amount = amount;
        this.status = Status;
        this.paymethod = paymethod;
        this.paymentDate = paymentDate;
    }
    // Getters
    getPaymentId() { return this.paymentId; }
    getLoanId() { return this.loanId; }
    getAmount() { return this.amount; }
    getStatus() { return this.status; }
    getPaymentDate() { return this.paymentDate; }
    getPaymethod() { return this.paymethod; }
    // Setters
    setAmount(amount) { this.amount = amount; }
    setStatus(status) { this.status = status; }
    setPaymentDate(paymentDate) { this.paymentDate = paymentDate; }
    setPaymethod(paymethod) { this.paymethod = paymethod; }
}
exports.Payment = Payment;
