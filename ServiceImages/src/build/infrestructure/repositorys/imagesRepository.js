import { Images } from '../../domain/schemas/images.js';
import { DatabaseSql } from '../database/db.js';
import { eq } from 'drizzle-orm';
export class repositoryImages {
    poolDb;
    constructor() {
        this.poolDb = DatabaseSql.getInstacne().getDb();
    }
    async upload(payload) {
        const ImagesCreated = await this.poolDb.insert(Images).values({
            idImages: payload.getIdImages(),
            idVehicle: payload.getIdVehicle(),
            fileName: payload.getFileName(),
            filePath: payload.getFilePath(),
            fileSize: payload.getFileSize(),
            width: payload.getWidth(),
            height: payload.getHeight()
        });
        return ImagesCreated;
    }
    async get() {
        return await this.poolDb.select().from(Images);
    }
    async getById(id) {
        return await this.poolDb.select().from(Images).where(eq(Images.idImages, id));
    }
    async getByIdVehicle(id) {
        return await this.poolDb.select().from(Images).where(eq(Images.idVehicle, id));
    }
    async delete() {
    }
}
