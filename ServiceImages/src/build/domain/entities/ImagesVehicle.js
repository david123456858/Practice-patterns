/* eslint-disable @typescript-eslint/naming-convention */
import { Images } from './Images.js';
export class ImagesVehicle extends Images {
    IdVehicle;
    constructor(IdVehicle, idImages, fileName, filePath, fileSize, width, height, updated_at, created_at) {
        super(idImages, fileName, filePath, fileSize, width, height, updated_at, created_at);
        this.IdVehicle = IdVehicle;
    }
    setIdVehicle(id) {
        this.IdVehicle = id;
    }
    getIdVehicle() {
        return this.IdVehicle;
    }
}
