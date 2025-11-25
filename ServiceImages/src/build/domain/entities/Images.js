/* eslint-disable @typescript-eslint/naming-convention */
export class Images {
    idImages;
    fileName;
    filePath;
    fileSize;
    width;
    height;
    updated_at;
    created_at;
    constructor(idImages, fileName, filePath, fileSize, width, height, updated_at, created_at) {
        this.idImages = idImages;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.width = width;
        this.height = height;
        this.updated_at = updated_at;
        this.created_at = created_at;
    }
    // ✅ Getters
    getIdImages() {
        return this.idImages;
    }
    getFileName() {
        return this.fileName;
    }
    getFilePath() {
        return this.filePath;
    }
    getFileSize() {
        return this.fileSize;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getUpdatedAt() {
        return this.updated_at;
    }
    getCreatedAt() {
        return this.created_at;
    }
    // ✅ Setters (opcional si quieres permitir actualización)
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
}
