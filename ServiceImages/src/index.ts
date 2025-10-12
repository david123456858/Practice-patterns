
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'reflect-metadata'

import { Server } from './infrestructure/Server/Server'

async function main (): Promise<void> {
  try {
    const server = Server.Instance
    server.listenServer()
  } catch (error) {
    console.log('Error al iniciar el servidor:', error)
  }
}

main()
