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
exports.LoanController = void 0;
class LoanController {
    constructor(service) {
        this.serviceLoan = service;
        this.createLoan = this.createLoan.bind(this);
        this.getLoan = this.getLoan.bind(this);
        this.getLoanId = this.getLoanId.bind(this);
        this.returnVehicleLoaned = this.returnVehicleLoaned.bind(this);
    }
    createLoan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const result = yield this.serviceLoan.create(body);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getLoan(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.serviceLoan.getAll();
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getLoanId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.serviceLoan.getById(id);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    returnVehicleLoaned(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const loanFinish = req.body;
            const result = yield this.serviceLoan.returnVehicleLoaned(loanFinish);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
}
exports.LoanController = LoanController;
