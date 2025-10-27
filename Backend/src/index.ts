/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-floating-promises */

import "reflect-metadata"
import 'dotenv/config'
import { Server } from './infrastructure/server/Server'
import { DatabaseConnection } from "./infrastructure/database/conection"
import { UserRepository } from "./infrastructure/repositories/User/repository"
import { AdminSeeder } from "./infrastructure/seeders/adminSeeders"

async function main (): Promise<void> {
  try {
    const conection = await DatabaseConnection.getInstance().verifyConnection()

    if (!conection) {
      throw new Error('No se pudo conectar a la base de datos')
    }
    const repositoy = new UserRepository()
    const adminFuntion = new AdminSeeder(repositoy)

    await adminFuntion.seedAdmin()
    await DatabaseConnection.getInstance().close()

    const server = Server.getIntance()
    server.listen()
  } catch (error) {
    console.error('Error al iniciar el servidor:', error)
  }
}

main()
