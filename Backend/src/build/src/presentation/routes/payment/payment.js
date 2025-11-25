"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const config_1 = require("../../../infrastructure/config/config");
const validate_1 = require("../../middlewares/ValidateDto/validate");
const create_1 = require("../../../domain/dtos/payment/create");
const payment_1 = require("../../../infrastructure/repositories/payment/payment");
const payment_2 = require("../../../application/use-cases/Payment/payment");
const payment_3 = require("../../controllers/payment/payment");
const paymentRoute = (prefix) => {
    const repository = new payment_1.PaymentRepository();
    const service = new payment_2.ServicePayment(repository);
    const controller = new payment_3.PaymentController(service);
    config_1.route.post(`${prefix}`, (0, validate_1.validateDto)(create_1.createPaymentDto), controller.paymentCreate);
    config_1.route.get(`${prefix}`, controller.getPaymentType);
    //   route.get(`${prefix}/:id`)
    return config_1.route;
};
exports.paymentRoute = paymentRoute;
