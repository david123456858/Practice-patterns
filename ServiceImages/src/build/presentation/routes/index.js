import { Router } from 'express';
import { ImagesRoutes } from './images/Images.js';
export class router {
    router;
    constructor() {
        this.router = Router();
        this.configureRoutes();
    }
    configureRoutes() {
        const imagesRouter = new ImagesRoutes();
        this.router.use('/images', imagesRouter.router);
    }
}
