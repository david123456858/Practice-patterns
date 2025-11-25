import { Images } from '../../domain/entities/Images.js';
export class ConcreteBuilderImages {
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
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    setUpdatedAt(date) {
        this.updated_at = date;
    }
    setCreatedAt(date) {
        this.created_at = date;
    }
    build() {
        return new Images(this.idImages, this.fileName, this.filePath, this.fileSize, this.width, this.height, this.updated_at, this.created_at);
    }
}
