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
exports.PaymentController = void 0;
const PaymentMethod_1 = require("../../../domain/types/Payment/PaymentMethod");
class PaymentController {
    constructor(service) {
        this.service = service;
        this.paymentCreate = this.paymentCreate.bind(this);
    }
    paymentCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = req.body;
            const result = yield this.service.PaymentStatus(payment);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getPaymentType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({ message: PaymentMethod_1.PaymentMethod });
        });
    }
}
exports.PaymentController = PaymentController;
