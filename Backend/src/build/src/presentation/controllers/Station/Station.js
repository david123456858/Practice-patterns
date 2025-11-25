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
exports.StationController = void 0;
class StationController {
    constructor(service) {
        this.serviceStation = service;
        this.createStation = this.createStation.bind(this);
        this.getStation = this.getStation.bind(this);
        this.getStationId = this.getStationId.bind(this);
    }
    createStation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const result = yield this.serviceStation.create(body);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getStation(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.serviceStation.getAll();
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
    getStationId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.serviceStation.getById(id);
            if (!result.success) {
                res.status(result.status).json({ error: result.error });
                return;
            }
            res.status(result.status).json({ message: result.value });
        });
    }
}
exports.StationController = StationController;
