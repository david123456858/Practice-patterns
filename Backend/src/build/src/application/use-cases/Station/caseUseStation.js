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
exports.ServiceStation = void 0;
const GeoLocation_1 = require("../../../domain/entities/GeoLocation/GeoLocation");
const Station_1 = require("../../../domain/entities/Station/Station");
const result_1 = require("../../../presentation/utils/result/result");
class ServiceStation {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(stationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findStation = yield this.userRepository.findById(stationDto.id);
                if (findStation) {
                    return (0, result_1.FailureProccess)('Station already exists', 400);
                }
                const station = new Station_1.Station(stationDto.id, stationDto.name, stationDto.address, new GeoLocation_1.GeoLocation(stationDto.geoLocation.getLatitude(), stationDto.geoLocation.getLatitude()));
                this.userRepository.save(station);
                return (0, result_1.SuccessProcess)('Station created successfully', 201);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error creating Station', 500);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const station = yield this.userRepository.findById(id);
                if (!station) {
                    return (0, result_1.FailureProccess)('User not found', 404);
                }
                return (0, result_1.SuccessProcess)(station, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error fetching user', 500);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.findAll();
                return (0, result_1.SuccessProcess)(users, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error fetching users', 500);
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
}
exports.ServiceStation = ServiceStation;
