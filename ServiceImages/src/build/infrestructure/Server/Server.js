/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from '../../presentation/routes/index.js';
export class Server {
    app;
    router;
    port;
    static instance;
    constructor() {
        this.app = express();
        this.port = 3000;
        this.router = new router();
        this.Middlwares();
        this.routes();
    }
    Middlwares() {
        this.app.use(cors({
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.disable('x-powered-by');
    }
    routes() {
        this.app.get('/', (_req, res) => {
            res.status(200).json({ message: 'Soy el servicio de imagenes' });
        });
        this.app.use('/api', this.router.router);
    }
    static get Instance() {
        if (!this.instance) {
            this.instance = new Server();
            return this.instance;
        }
        return this.instance;
    }
    /**
       * listenServer
       */
    listenServer() {
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}`);
        });
    }
}
