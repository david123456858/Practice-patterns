import path from 'path';
export class ImagesController {
    service;
    constructor(service) {
        this.service = service;
        this.upload = this.upload.bind(this);
        this.getVehicleById = this.getVehicleById.bind(this);
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.serveImage = this.serveImage.bind(this);
    }
    async upload(req, res, next) {
        const detalisFile = req.file;
        const idVehicle = req.body;
        const result = await this.service.upload(detalisFile, idVehicle.idVehicle);
        if (!result.success) {
            console.log(result.error);
            res.status(result.status).json({ error: result.error });
            return;
        }
        res.status(result.status).json({ message: result.value });
    }
    async get(req, res, next) {
        const result = await this.service.get();
        if (!result.success) {
            console.log(result.error);
            res.status(result.status).json({ error: result.error });
            return;
        }
        res.status(result.status).json({ message: result.value });
    }
    async getById(req, res, next) {
        const { id } = req.params;
        const result = await this.service.getById(id);
        if (!result.success) {
            console.log(result.error);
            res.status(result.status).json({ error: result.error });
            return;
        }
        res.status(result.status).json({ message: result.value });
    }
    async getVehicleById(req, res, next) {
        const { id } = req.params;
        const result = await this.service.getById(id);
        if (!result.success) {
            console.log(result.error);
            res.status(result.status).json({ error: result.error });
            return;
        }
        res.status(result.status).json({ message: result.value });
    }
    async delete(req, res, next) {
        res.status(200).json({ message: 'calmate estamos en contruccui' });
    }
    async serveImage(req, res, next) {
        const { imageId } = req.params;
        console.log(imageId);
        const result = await this.service.serveImage(imageId);
        if (!result.success) {
            console.log(result.error);
            res.status(result.status).json({ error: result.error });
            return;
        }
        res.status(result.status).sendFile(path.resolve(result.value));
    }
}
