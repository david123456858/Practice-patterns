"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeStation = void 0;
const config_1 = require("../../../infrastructure/config/config");
const validate_1 = require("../../middlewares/ValidateDto/validate");
const create_1 = require("../../../domain/dtos/Station/create");
const station_1 = require("../../../infrastructure/repositories/Station/station");
const caseUseStation_1 = require("../../../application/use-cases/Station/caseUseStation");
const Station_1 = require("../../controllers/Station/Station");
const routeStation = (prefix) => {
    const repository = new station_1.RepositoryStation();
    const service = new caseUseStation_1.ServiceStation(repository);
    const controller = new Station_1.StationController(service);
    config_1.route.post(`${prefix}`, (0, validate_1.validateDto)(create_1.createStationDto), controller.createStation);
    config_1.route.get(`${prefix}`, controller.getStation);
    config_1.route.get(`${prefix}/:id`, controller.getStationId);
    return config_1.route;
};
exports.routeStation = routeStation;
