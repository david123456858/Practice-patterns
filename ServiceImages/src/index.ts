
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'reflect-metadata'

import { Server } from './infrestructure/Server/Server.js'
import { DatabaseConnection } from './infrestructure/database/connection.js'

async function main (): Promise<void> {
  try {
    const conection = await DatabaseConnection.getInstance().verifyConnection()

    if (!conection) {
      throw new Error('No se pudo conectar a la base de datos')
    }
    const server = Server.Instance
    server.listenServer()
  } catch (error) {
    console.log('Error al iniciar el servidor:', error)
  }
}

main()
