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
exports.RepositoryStation = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const data_1 = require("../../database/data");
const Station_1 = require("../../database/Schemas/Station");
class RepositoryStation {
    constructor() {
        this.pool = data_1.DatabaseSql.getInstacne().getDb();
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.insert(Station_1.stations).values({
                idStation: data.getId(),
                name: data.getName(),
                address: data.getAdress(),
                latitude: data.getGeoLocation().getLatitude(),
                longitude: data.getGeoLocation().getLongitude(),
                locationTimestamp: data.getGeoLocation().getTimestamp()
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool
                .delete(Station_1.stations)
                .where((0, drizzle_orm_1.eq)(Station_1.stations.idStation, id));
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool
                .update(Station_1.stations)
                .set({
                idStation: data.getId(),
                name: data.getName(),
                address: data.getAdress(),
                latitude: data.getGeoLocation().getLatitude().toString(),
                longitude: data.getGeoLocation().getLongitude().toString(),
                locationTimestamp: data.getGeoLocation().getTimestamp()
            })
                .where((0, drizzle_orm_1.eq)(Station_1.stations.idStation, data.getId()));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool
                .select()
                .from(Station_1.stations)
                .where((0, drizzle_orm_1.eq)(Station_1.stations.idStation, id));
            return result[0];
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pool.select().from(Station_1.stations);
        });
    }
}
exports.RepositoryStation = RepositoryStation;
