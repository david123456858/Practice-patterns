"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePayment = void 0;
const payment_1 = require("./../../../domain/entities/Payment/payment");
const factory_Payment_1 = require("../../../domain/factories/payment/factory_Payment");
const result_1 = require("../../../presentation/utils/result/result");
const PaymentStatus_1 = require("../../../domain/types/Payment/PaymentStatus");
class ServicePayment {
    constructor(repositoryPayment) {
        this.repositoryPayment = repositoryPayment;
        this.factoryPayment = new factory_Payment_1.PaymentProcessorFactory();
    }
    PaymentStatus(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymet = yield this.repositoryPayment.findByLoanId(payment.loanId);
                if (!paymet) {
                    return (0, result_1.FailureProccess)('payment not found', 404);
                }
                const onlypayment = paymet.find((index) => index.loanId === payment.loanId);
                const paymentInstance = new payment_1.Payment(onlypayment.paymentId, onlypayment.loanId, onlypayment.amount, onlypayment.status, onlypayment.paymentMethod, new Date());
                const paymentProccessor = this.factoryPayment.createPaymentMehod(payment.method);
                // lewno de la clase que se va a utilizar
                const paymentUpdated = yield paymentProccessor.doPay(paymentInstance);
                yield this.repositoryPayment.update(paymentUpdated);
                return (0, result_1.SuccessProcess)('payment processed successfully', 200);
            }
            catch (error) {
                console.log(error);
                return (0, result_1.FailureProccess)('Error processing payment', 500);
            }
        });
    }
    paymentCreate(paymentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = new payment_1.Payment(Math.random().toString(36).substring(2, 15), // paymentId,
                paymentDto.loanId, paymentDto.amount, PaymentStatus_1.PaymentStatus.PENDING, // Status
                paymentDto.method, // Status
                new Date());
                console.log(payment);
                yield this.repositoryPayment.save(payment);
                return (0, result_1.SuccessProcess)(payment, 201);
            }
            catch (error) {
                console.log(error);
                return (0, result_1.FailureProccess)('Error creating payment', 500);
            }
        });
    }
}
exports.ServicePayment = ServicePayment;
