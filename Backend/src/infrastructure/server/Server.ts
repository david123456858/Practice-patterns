import express, { Application } from 'express'
import cors from 'cors'

export class Server {
  private readonly app: Application
  private readonly port: string

  constructor () {
    this.app = express()
    this.port = process.env.PORT || '3000'

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
    // Aquí importarás y usarás tus rutas
    // ejemplo: this.app.use('/api/users', UserRoutes);
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`)
    })
  }
}
