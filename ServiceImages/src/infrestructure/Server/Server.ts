/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from '../../presentation/routes/index'

export class Server {
  private readonly app: Application
  private readonly router: router
  private readonly port: string

  private static instance: Server

  private constructor () {
    this.app = express()
    this.port = '3000'
    this.router = new router()

    this.Middlwares()
    this.routes()
  }

  private Middlwares (): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.disable('x-powered-by')
  }

  private routes (): void {
    this.app.use('/api', this.router.router)
  }

  public static get Instance (): Server {
    if (!this.instance) {
      this.instance = new Server()
      return this.instance
    }

    return this.instance
  }

  /**
     * listenServer
     */
  public listenServer (): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto http://localhost:${this.port}`)
    })
  }
}
