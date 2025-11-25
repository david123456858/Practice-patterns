"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashPaymentProcessor = void 0;
const PaymentStatus_1 = require("../../types/Payment/PaymentStatus");
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CashPaymentProcessor {
    doPay(payment) {
        setTimeout(() => {
            console.log('Processing cash payment...');
        }, 5000);
        payment.setStatus(PaymentStatus_1.PaymentStatus.COMPLETED);
        return payment;
    }
}
exports.CashPaymentProcessor = CashPaymentProcessor;
