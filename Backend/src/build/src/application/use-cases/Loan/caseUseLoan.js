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
exports.ServiceLoan = void 0;
const create_1 = require("../../../domain/dtos/payment/create");
const Loan_1 = require("../../../domain/entities/Loan/Loan");
const LoanEnum_1 = require("../../../domain/types/Loan/LoanEnum");
const PaymentMethod_1 = require("../../../domain/types/Payment/PaymentMethod");
const VehiculeEnum_1 = require("../../../domain/types/Vehicule/VehiculeEnum");
const result_1 = require("../../../presentation/utils/result/result");
const time_1 = require("../../../presentation/utils/time/time");
class ServiceLoan {
    constructor(loanRepository, vehicleReposito, repositoryUser, servicePayment) {
        this.loanRepository = loanRepository;
        this.vehicleReposito = vehicleReposito;
        this.repositoryUser = repositoryUser;
        this.servicePayment = servicePayment;
    }
    create(LoanDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findLoan = yield this.loanRepository.findById(LoanDto.loanId);
                if (findLoan.length > 1) {
                    return (0, result_1.FailureProccess)('loan already exists', 400);
                }
                const loan = new Loan_1.Loan(LoanDto.loanId, LoanDto.userId, LoanDto.vehicleId, LoanDto.startStationId, new Date());
                const vehicleInUse = yield this.vehicleReposito.findById(LoanDto.vehicleId);
                if (!vehicleInUse) {
                    return (0, result_1.FailureProccess)('Vehicle not found', 404);
                }
                const vehicle = vehicleInUse.find(index => index.idVehicle === LoanDto.vehicleId);
                vehicle.state = VehiculeEnum_1.StatusVehicle.IN_USE;
                this.vehicleReposito.update(vehicle); // actualizamos el estado del vehiculo
                this.loanRepository.save(loan);
                console.log(loan);
                return (0, result_1.SuccessProcess)(loan, 201);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error creating loan', 500);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Loan = yield this.loanRepository.findById(id);
                if (!Loan) {
                    return (0, result_1.FailureProccess)('loan not found', 404);
                }
                return (0, result_1.SuccessProcess)(Loan, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error fetching loan', 500);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Loans = yield this.loanRepository.findAll();
                return (0, result_1.SuccessProcess)(Loans, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error fetching loans', 500);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, result_1.SuccessProcess)('', 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('', 500);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, result_1.SuccessProcess)('', 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('', 500);
            }
        });
    }
    returnVehicleLoaned(loanDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 🔹 1. Buscar préstamo
                const loanResult = yield this.loanRepository.findById(loanDto.loanId);
                const loan = loanResult.find(index => index.loanId === loanDto.loanId);
                if (!loan)
                    return (0, result_1.FailureProccess)('Loan not found', 404);
                // 🔹 2. Actualizar estado y tiempos
                const endTime = new Date();
                const startTime = new Date(loan.startTime);
                const durationMinutes = (0, time_1.diffDatesInMinutes)(startTime, endTime);
                const cost = durationMinutes * Number(loan.cost || 0);
                loan.endTime = endTime;
                loan.status = LoanEnum_1.LoanStatus.COMPLETED;
                loan.endStationId = loanDto.endStationId;
                loan.cost = cost.toString();
                // 🔹 3. Buscar vehículo
                const vehicleResult = yield this.vehicleReposito.findById(loan.vehicleId);
                const vehicle = Array.isArray(vehicleResult) ? vehicleResult[0] : vehicleResult;
                if (!vehicle)
                    return (0, result_1.FailureProccess)('Vehicle not found', 404);
                vehicle.state = VehiculeEnum_1.StatusVehicle.AVAILABLE;
                // 🔹 4. Buscar usuario
                const userResult = yield this.repositoryUser.findById(loan.userId);
                const user = Array.isArray(userResult) ? userResult[0] : userResult;
                if (!user)
                    return (0, result_1.FailureProccess)('User not found', 404);
                // 🔹 5. Crear pago
                const dto = new create_1.createPaymentDto();
                dto.amount = cost;
                dto.loanId = loan.loanId;
                dto.method = PaymentMethod_1.PaymentMethod.EFECTIVE;
                const paymentResult = yield this.servicePayment.paymentCreate(dto);
                if (!paymentResult.success) {
                    return (0, result_1.FailureProccess)('Payment creation failed', 400);
                }
                console.log(vehicle);
                console.log(loan);
                console.log(user);
                // 🔹 6. Actualizar entidades en DB
                yield this.vehicleReposito.update(vehicle);
                yield this.loanRepository.update(loan);
                yield this.repositoryUser.update(user);
                return (0, result_1.SuccessProcess)(paymentResult.value, 200);
            }
            catch (error) {
                console.error('Error in returnVehicleLoaned:', error);
                return (0, result_1.FailureProccess)('Internal Server Error', 500);
            }
        });
    }
}
exports.ServiceLoan = ServiceLoan;
