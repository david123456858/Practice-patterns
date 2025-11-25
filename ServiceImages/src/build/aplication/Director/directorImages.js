import { randomUUID } from 'crypto';
export class DirectorImages {
    builder;
    SetBuilder(builder) {
        this.builder = builder;
    }
    async createImagesVehicle(payload, idVehicle) {
        this.builder.setVehicleId(idVehicle);
        this.builder.setFileName(payload.filename);
        this.builder.setFilePath(payload.path);
        this.builder.setFileSize(payload.size);
        this.builder.setIdImages(randomUUID());
        this.builder.setCreatedAt(new Date());
        this.builder.setUpdatedAt(new Date());
    }
}
