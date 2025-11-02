/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import config from '../config/config'
import { routerUser } from '../../presentation/routes/User/User'
import morgan from 'morgan'
import { routeStation } from '../../presentation/routes/Station/Station'
import { routeVehicle } from '../../presentation/routes/Vehicle/Vehicle'
import { routeLoan } from '../../presentation/routes/Loan/Loan'
import { routeAuth } from '../../presentation/routes/auth/auth'
import { paymentRoute } from '../../presentation/routes/payment/payment'

export class Server {
  private static instance: Server
  private readonly app: Application
  private readonly port: string

  private constructor () {
    this.app = express()
    this.port = '3001'

    // Middlewares
    this.middlewares()

    // Rutas
    this.routes().then(() => {
      console.log('rutas listas')
    })
  }

  private middlewares (): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.disable('x-powered-by')
  }

  private async routes (): Promise<void> {
    this.app.get('/', (_req: Request, res: Response) => {
      res.status(200).json({ message: 'I life' })
    })

    this.app.use(config.routeBase, routeAuth('/auth'))
    this.app.use(config.routeBase, await routerUser('/user'))
    this.app.use(config.routeBase, routeStation('/station'))
    this.app.use(config.routeBase, routeVehicle('/vehicle'))
    this.app.use(config.routeBase, routeLoan('/loan'))
    this.app.use(config.routeBase, paymentRoute('/payment'))
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto http://localhost:${this.port}`)
    })
  }

  public static getIntance (): Server {
    if (!this.instance) {
      this.instance = new Server()
    }
    return this.instance
  }
}
