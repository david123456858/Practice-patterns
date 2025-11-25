'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.DatabaseConnection = void 0
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// Backend/src/infrastructure/database/connection.ts
const pg_1 = require('pg')
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config({ path: '/vault/secrets/config.env' })
class DatabaseConnection {
  constructor () {
    this.pool = null
    this.maxRetries = 5
    this.retryDelay = 3000 // 3 segundos
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new DatabaseConnection()
    }
    return this.instance
  }

  /**
     * Verifica la conexión a la base de datos con reintentos
     */
  verifyConnection () {
    return __awaiter(this, void 0, void 0, function * () {
      const dbUrl = process.env.DATABASE_URL
      console.log(process.env.DATABASE_URL)
      console.log(dbUrl)
      if (!dbUrl) {
        console.error('❌ ERROR: DATABASE_URL no está configurada en las variables de entorno')
        return false
      }
      console.log('🔍 Verificando conexión a la base de datos...')
      for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
        try {
          // Crear pool temporal para verificar conexión
          const testPool = new pg_1.Pool({
            connectionString: dbUrl,
            connectionTimeoutMillis: 5000
          })
          // Intentar una consulta simple
          const result = yield testPool.query('SELECT NOW()')
          if (result.rows.length > 0) {
            console.log(`✅ Conexión exitosa a la base de datos (intento ${attempt}/${this.maxRetries})`)
            console.log(`📊 Timestamp del servidor: ${result.rows[0].now}`)
            // Guardar el pool para uso futuro
            this.pool = testPool
            return true
          }
          yield testPool.end()
        } catch (error) {
          console.error(`❌ Error en el intento ${attempt}/${this.maxRetries}:`, error instanceof Error ? error.message : error)
          if (attempt < this.maxRetries) {
            console.log(`⏳ Reintentando en ${this.retryDelay / 1000} segundos...`)
            yield this.delay(this.retryDelay)
          }
        }
      }
      console.error('❌ No se pudo establecer conexión a la base de datos después de varios intentos')
      return false
    })
  }

  /**
     * Obtiene el pool de conexiones
     */
  getPool () {
    return this.pool
  }

  /**
     * Cierra todas las conexiones
     */
  close () {
    return __awaiter(this, void 0, void 0, function * () {
      if (this.pool != null) {
        yield this.pool.end()
        this.pool = null
        console.log('🔌 Conexiones a la base de datos cerradas')
      }
    })
  }

  /**
     * Delay helper
     */
  delay (ms) {
    return __awaiter(this, void 0, void 0, function * () {
      return yield new Promise(resolve => setTimeout(resolve, ms))
    })
  }

  /**
     * Verifica si hay conexión activa
     */
  isConnected () {
    return this.pool !== null
  }
}
exports.DatabaseConnection = DatabaseConnection
