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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const result_1 = require("../../../presentation/utils/result/result");
const Vehicle_1 = require("../../../domain/factories/providers/Vehicle");
const VehiculeEnum_1 = require("../../../domain/types/Vehicule/VehiculeEnum");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "/vault/secrets/config.env" });
class VehicleService {
    constructor(vehicleRepository, stationRepository) {
        this.vehicleRepository = vehicleRepository;
        this.stationRepository = stationRepository;
        this.providerFactory = Vehicle_1.ProviderVehicle.getInstance();
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleResult = yield this.vehicleRepository.findById(id);
                const vehicle = Array.isArray(vehicleResult) ? vehicleResult[0] : vehicleResult;
                if (!vehicle)
                    return (0, result_1.FailureProccess)('Vehicle not found', 404);
                yield this.vehicleRepository.delete(id);
                return (0, result_1.SuccessProcess)('Vehicle deleted successfully', 200);
            }
            catch (error) {
                console.error('Error deleting vehicle:', error);
                return (0, result_1.FailureProccess)('Internal server error', 500);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleResult = yield this.vehicleRepository.findById(id);
                const vehicle = Array.isArray(vehicleResult) ? vehicleResult[0] : vehicleResult;
                if (!vehicle)
                    return (0, result_1.FailureProccess)('Vehicle not found', 404);
                // Actualizar los campos permitidos
                Object.assign(vehicle, data);
                yield this.vehicleRepository.update(vehicle);
                return (0, result_1.SuccessProcess)('Vehicle updated successfully', 200);
            }
            catch (error) {
                console.error('Error updating vehicle:', error);
                return (0, result_1.FailureProccess)('Internal server error', 500);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingStation = yield this.stationRepository.findById(data.getStation().getIdStation());
                if (!existingStation)
                    return (0, result_1.FailureProccess)('Station not found', 404);
                // Validar si el vehículo ya existe
                const existingVehicleResult = yield this.vehicleRepository.findById(data.idVehicle);
                if (existingVehicleResult.length > 0)
                    return (0, result_1.FailureProccess)('Vehicle already exists', 400);
                const factory = this.providerFactory.getFactory(data.getVehicleType());
                const isElectric = data.getVehicleType().includes('ELECTRIC');
                const vehicle = factory.createVehicle(data, isElectric);
                yield this.vehicleRepository.save(vehicle);
                return (0, result_1.SuccessProcess)('vehicle created successfully', 200);
            }
            catch (error) {
                console.log(error);
                return (0, result_1.FailureProccess)('Error internal server', 500);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.vehicleRepository.findAll();
                const infoComplete = yield Promise.all(result.map((vehicle) => __awaiter(this, void 0, void 0, function* () {
                    const image = yield this.fetchImageUrl(vehicle.idVehicle);
                    return Object.assign(Object.assign({}, vehicle), { image });
                })));
                return (0, result_1.SuccessProcess)(infoComplete, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error internal server', 500);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.vehicleRepository.findById(id);
                const vehicle = Array.isArray(result) ? result[0] : result;
                if (!result)
                    return (0, result_1.FailureProccess)('Not exit vehicle', 400);
                return (0, result_1.SuccessProcess)(vehicle, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error internal server', 500);
            }
        });
    }
    getAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.vehicleRepository.findByAvailable();
                const infoComplete = yield Promise.all(result.map((vehicle) => __awaiter(this, void 0, void 0, function* () {
                    const image = yield this.fetchImageUrl(vehicle.idVehicle);
                    return Object.assign(Object.assign({}, vehicle), { image });
                })));
                return (0, result_1.SuccessProcess)(infoComplete, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error internal server', 500);
            }
        });
    }
    getAvailableByStation(stationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.vehicleRepository.findByStationAvailable(stationId);
                const available = result.filter(v => v.state === VehiculeEnum_1.StatusVehicle.AVAILABLE);
                const infoComplete = yield Promise.all(available.map((vehicle) => __awaiter(this, void 0, void 0, function* () {
                    const image = yield this.fetchImageUrl(vehicle.idVehicle);
                    return Object.assign(Object.assign({}, vehicle), { image });
                })));
                return (0, result_1.SuccessProcess)(infoComplete, 200);
            }
            catch (error) {
                return (0, result_1.FailureProccess)('Error internal server', 500);
            }
        });
    }
    fetchImageUrl(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${process.env.URL_IMAGES}/api/images/vehicle/${vehicle}`);
                if (!response.ok)
                    return ['https://example.com/default-image.jpg'];
                const data = yield response.json();
                return data.message.images;
            }
            catch (_a) {
                return ['https://example.com/default-image.jpg'];
            }
        });
    }
}
exports.VehicleService = VehicleService;
