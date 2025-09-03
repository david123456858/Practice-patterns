import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import config from '../config/config'
import { routerUser } from '../../presentation/routes/User/User'
import morgan from 'morgan'
import { routeStation } from '../../presentation/routes/Station/Station'
import { routeTypeVehicle } from '../../presentation/routes/TypeVehicle/TypeVehicle'

export class Server {
  private readonly app: Application
  private readonly port: string

  constructor () {
    this.app = express()
    this.port = config.port

    // Middlewares
    this.middlewares()

    // Rutas
    this.routes()
  }

  private middlewares (): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
  }

  private routes (): void {
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({ message: 'I life' })
    })

    this.app.use(config.routeBase, routerUser('/user'))
    this.app.use(config.port, routeStation('/station'))
    this.app.use(config.port, routeTypeVehicle('/typeVehicle'))
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto http://localhost:${this.port}`)
    })
  }
}
