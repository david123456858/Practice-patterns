import { ImagesVehicle } from '../../domain/entities/ImagesVehicle.js';
export class ConcreteBuilderImagesVehicles {
    idVehicle;
    idImages;
    fileName;
    filePath;
    fileSize;
    width;
    height;
    updated_at;
    created_at;
    setIdImages(id) {
        this.idImages = id;
    }
    setFileName(name) {
        this.fileName = name;
    }
    setFilePath(path) {
        this.filePath = path;
    }
    setFileSize(size) {
        this.fileSize = size;
    }
    setWidth(width) {
        this.width = 300;
    }
    setHeight(height) {
        this.height = 300;
    }
    setUpdatedAt(date) {
        this.updated_at = date;
    }
    setCreatedAt(date) {
        this.created_at = date;
    }
    setVehicleId(id) {
        this.idVehicle = id;
    }
    build() {
        return new ImagesVehicle(this.idVehicle, this.idImages, this.fileName, this.filePath, this.fileSize, this.width, this.height, this.updated_at, this.created_at);
    }
}
