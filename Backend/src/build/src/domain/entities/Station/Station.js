"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Station = void 0;
class Station {
    constructor(idStation, name, address, geoLocation) {
        this.idStation = idStation;
        this.name = name;
        this.address = address;
        this.geoLocation = geoLocation;
    }
    getId() {
        return this.idStation;
    }
    setId(idStation) {
        this.idStation = idStation;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getAdress() {
        return this.address;
    }
    setAdress(address) {
        this.address = address;
    }
    getGeoLocation() {
        return this.geoLocation;
    }
    setGeoLocation(latitude, longitude) {
        this.geoLocation.setLocation(latitude, longitude);
    }
}
exports.Station = Station;
