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
exports.RepositoryVehicule = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const data_1 = require("../../database/data");
const Vehicle_1 = require("../../database/Schemas/Vehicle");
const VehiculeEnum_1 = require("../../../domain/types/Vehicule/VehiculeEnum");
const parse_1 = require("../../../presentation/utils/parse/parse");
class RepositoryVehicule {
    constructor() {
        this.pool = data_1.DatabaseSql.getInstacne().getDb();
    }
    // 🔹 CREATE
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.insert(Vehicle_1.vehicles).values({
                idVehicle: data.getIdVehicle(),
                color: data.getColor(),
                model: data.getModel(),
                stationId: data.getIdStation().idStation,
                state: data.getState(),
                type: data.getType(),
                latitude: data.getGeoLocation().getLatitude(),
                longitude: data.getGeoLocation().getLongitude(),
                locationTimestamp: new Date(data.getGeoLocation().getTimestamp()),
                maxUserWeight: data.getMaxUserWeight(),
                velocityMax: data.getVelocityMax(),
                costForMinute: data.getCostForMinute(),
                info: data.getInfo()
            });
        });
    }
    // 🔹 DELETE
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.delete(Vehicle_1.vehicles).where((0, drizzle_orm_1.eq)(Vehicle_1.vehicles.idVehicle, id));
        });
    }
    // 🔹 UPDATE
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.update(Vehicle_1.vehicles).set({
                color: data.color,
                model: data.model,
                stationId: data.stationId,
                state: data.state,
                type: data.type,
                latitude: data.latitude,
                longitude: data.longitude,
                locationTimestamp: new Date(data.locationTimestamp),
                maxUserWeight: data.maxUserWeight,
                velocityMax: data.velocityMax,
                costForMinute: data.costForMinute,
                info: data.info
            });
        });
    }
    // 🔹 FIND BY ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, parse_1.parseJson)(yield this.pool
                .select()
                .from(Vehicle_1.vehicles)
                .where((0, drizzle_orm_1.eq)(Vehicle_1.vehicles.idVehicle, id)));
        });
    }
    // 🔹 FIND ALL
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.select().from(Vehicle_1.vehicles);
            return (0, parse_1.parseJson)(result);
        });
    }
    // 🔹 FIND AVAILABLE VEHICLES
    findByAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool
                .select()
                .from(Vehicle_1.vehicles)
                .where((0, drizzle_orm_1.eq)(Vehicle_1.vehicles.state, VehiculeEnum_1.StatusVehicle.AVAILABLE));
            return (0, parse_1.parseJson)(result);
        });
    }
    // 🔹 FIND AVAILABLE VEHICLES BY STATION
    findByStationAvailable(idStation) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool
                .select()
                .from(Vehicle_1.vehicles)
                .where((0, drizzle_orm_1.eq)(Vehicle_1.vehicles.stationId, idStation));
            return (0, parse_1.parseJson)(result);
        });
    }
}
exports.RepositoryVehicule = RepositoryVehicule;
