import { Router } from 'express'
import { ImagesController } from '../../controller/Images/Images'
import { MulterManagament } from '../../middleware/multer/multer'

export class ImagesRoutes {
  public router: Router
  private readonly controller: ImagesController
  private readonly middlewareMulter: MulterManagament

  constructor () {
    this.router = Router()
    this.controller = new ImagesController()
    this.middlewareMulter = new MulterManagament()
    this.configureRouter()
  }

  private configureRouter (): void {
    this.router.get('/', this.middlewareMulter.upload, this.controller.get)

    this.router.post('/', this.controller.upload)

    this.router.get('/{id}', this.controller.getById)

    this.router.delete('/{id}', this.controller.delete)
  }
}
