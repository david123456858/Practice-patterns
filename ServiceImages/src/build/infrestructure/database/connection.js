/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// Backend/src/infrastructure/database/connection.ts
import { Pool } from 'pg';
export class DatabaseConnection {
    static instance;
    pool = null;
    maxRetries = 5;
    retryDelay = 3000; // 3 segundos
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseConnection();
        }
        return this.instance;
    }
    /**
     * Verifica la conexión a la base de datos con reintentos
     */
    async verifyConnection() {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            console.error('❌ ERROR: DATABASE_URL no está configurada en las variables de entorno');
            return false;
        }
        console.log('🔍 Verificando conexión a la base de datos...');
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                // Crear pool temporal para verificar conexión
                const testPool = new Pool({
                    connectionString: dbUrl,
                    connectionTimeoutMillis: 5000
                });
                // Intentar una consulta simple
                const result = await testPool.query('SELECT NOW()');
                if (result.rows.length > 0) {
                    console.log(`✅ Conexión exitosa a la base de datos (intento ${attempt}/${this.maxRetries})`);
                    console.log(`📊 Timestamp del servidor: ${result.rows[0].now}`);
                    // Guardar el pool para uso futuro
                    this.pool = testPool;
                    return true;
                }
                await testPool.end();
            }
            catch (error) {
                console.error(`❌ Error en el intento ${attempt}/${this.maxRetries}:`, error instanceof Error ? error.message : error);
                if (attempt < this.maxRetries) {
                    console.log(`⏳ Reintentando en ${this.retryDelay / 1000} segundos...`);
                    await this.delay(this.retryDelay);
                }
            }
        }
        console.error('❌ No se pudo establecer conexión a la base de datos después de varios intentos');
        return false;
    }
    /**
     * Obtiene el pool de conexiones
     */
    getPool() {
        return this.pool;
    }
    /**
     * Cierra todas las conexiones
     */
    async close() {
        if (this.pool != null) {
            await this.pool.end();
            this.pool = null;
            console.log('🔌 Conexiones a la base de datos cerradas');
        }
    }
    /**
     * Delay helper
     */
    async delay(ms) {
        return await new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Verifica si hay conexión activa
     */
    isConnected() {
        return this.pool !== null;
    }
}
