import 'dotenv/config';
import { Server } from './infrastructure/server/Server';

async function main() {
    try {
        const server = new Server();
        server.listen();
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

main();
