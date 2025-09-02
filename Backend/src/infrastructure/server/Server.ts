import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import config from '../config/config'
import { routerUser } from '../../presentation/routes/User/User'

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
  }

  private routes (): void {
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({ message: 'I life' })
    })

    this.app.use(config.routeBase, routerUser('/users'))
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto http://localhost:${this.port}`)
    })
  }
}
