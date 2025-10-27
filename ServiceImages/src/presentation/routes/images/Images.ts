import { Router } from 'express'
import { ImagesController } from '../../controller/Images/Images.js'
import { MulterManagament } from '../../middleware/multer/multer.js'
import { repositoryImages } from '../../../infrestructure/repositorys/imagesRepository.js'
import { ServiceImages } from '../../../aplication/case-use/caseUseImages.js'
import { JwtUrlSigner } from '../../middleware/jwt/jwt.js'

export class ImagesRoutes {
  public router: Router
  private readonly repository: repositoryImages
  private readonly service: ServiceImages
  private readonly controller: ImagesController
  private readonly middlewareMulter: MulterManagament
  private readonly middlewareJwt: JwtUrlSigner

  constructor () {
    this.router = Router()
    this.repository = new repositoryImages()
    this.service = new ServiceImages(this.repository)
    this.controller = new ImagesController(this.service)
    this.middlewareMulter = new MulterManagament()
    this.middlewareJwt = new JwtUrlSigner()
    this.configureRouter()
  }

  private configureRouter (): void {
    this.router.get('/', this.controller.get)

    this.router.post('/', this.middlewareMulter.upload, this.controller.upload)

    this.router.get('/:id', this.controller.getById)

    this.router.get('/vehicle/:id', this.controller.getVehicleById)

    this.router.get('/serve/:imageId', this.middlewareJwt.validateSignedUrl, this.controller.serveImage)

    this.router.delete('/:id', this.controller.delete)
  }
}
