
import { Router } from 'express'
import { ImagesRoutes } from './images/Images.js'

export class router {
  public router: Router

  constructor () {
    this.router = Router()
    this.configureRoutes()
  }

  private configureRoutes (): void {
    const imagesRouter = new ImagesRoutes()
    this.router.use('/images', imagesRouter.router)
  }
}
