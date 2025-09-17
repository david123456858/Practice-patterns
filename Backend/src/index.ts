/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-floating-promises */
import "reflect-metadata"
import 'dotenv/config'
import { Server } from './infrastructure/server/Server'

async function main (): Promise<void> {
  try {
    const server = new Server()
    server.listen()
  } catch (error) {
    console.error('Error al iniciar el servidor:', error)
  }
}

main()
