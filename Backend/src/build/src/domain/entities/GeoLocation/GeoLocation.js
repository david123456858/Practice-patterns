"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocation = void 0;
class GeoLocation {
    constructor(latitude, longitude, timestamp) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp !== null && timestamp !== void 0 ? timestamp : new Date();
    }
    getLatitude() { return this.latitude; }
    getLongitude() { return this.longitude; }
    getTimestamp() { return this.timestamp; }
    setLocation(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
exports.GeoLocation = GeoLocation;
