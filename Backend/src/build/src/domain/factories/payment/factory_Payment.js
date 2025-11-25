"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProcessorFactory = void 0;
const efective_factory_1 = require("./efective-factory");
class PaymentProcessorFactory {
    constructor() {
        this.methods = new Map([
            ['EFECTIVE', new efective_factory_1.CashPaymentProcessor()]
        ]);
    }
    createPaymentMehod(methods) {
        const paymethod = this.methods.get(methods);
        if (paymethod == null) {
            throw new Error('Payment method not found');
        }
        return paymethod;
    }
}
exports.PaymentProcessorFactory = PaymentProcessorFactory;
