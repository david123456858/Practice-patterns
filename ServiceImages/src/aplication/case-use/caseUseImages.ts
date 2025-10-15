/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { FailureProccess, SuccessProcess } from './../../utils/result'
import { IFailureProcess } from './../../domain/interfaces/Result'
import { ISuccessProcess } from '../../domain/interfaces/Result'
import { ConcreteBuilderImagesVehicles } from '../../infrestructure/builders/ConcreteImagesVehicles'
import { DirectorImages } from '../Director/directorImages'
import { repositoryImages } from '../../infrestructure/repositorys/imagesRepository'
import { JwtUrlSigner } from '../../presentation/middleware/jwt/jwt'
import fs from 'fs'

export class ServiceImages {
  private readonly builderImages: ConcreteBuilderImagesVehicles
  private readonly jwtURLs: JwtUrlSigner
  constructor (private readonly repository: repositoryImages) {
    this.builderImages = new ConcreteBuilderImagesVehicles()
    this.jwtURLs = new JwtUrlSigner()
  }

  async upload (payload: Express.Multer.File | undefined, idVehicle: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      if (!payload) return FailureProccess('bad requests', 400)

      const director = new DirectorImages()
      director.SetBuilder(this.builderImages)
      await director.createImagesVehicle(payload, idVehicle)
      console.log(this.builderImages.build())

      await this.repository.upload(this.builderImages.build())

      return SuccessProcess('Images Uploaded', 200)
    } catch (error) {
      console.log(error)

      return FailureProccess('', 500)
    }
  }

  async get (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const result = await this.repository.get()

      return SuccessProcess(result, 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async getById (id: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      if (!id) return FailureProccess('Bad requests', 400)
      const Imagevehicle = await this.repository.getByIdVehicle(id)

      if (Imagevehicle === undefined) return FailureProccess('No found', 404)

      const UrlGenerated = Imagevehicle.map((index) => this.jwtURLs.generateSecureUrl(index.idImages))

      return SuccessProcess({
        Imagevehicle,
        images: UrlGenerated
      }, 200)
    } catch (error) {
      return FailureProccess('Error internal Server', 500)
    }
  }

  async delete (): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      return SuccessProcess('', 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }

  async serveImage (idImage: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      if (!idImage) return FailureProccess('Bad requests', 400)

      const Imagevehicle = await this.repository.getById(idImage)
      if (Imagevehicle === undefined) return FailureProccess('No found', 404)

      const Image = Imagevehicle.find((index) => index.idImages === idImage)
      const filePath = Image.filePath
      if (!fs.existsSync(filePath)) return FailureProccess('Image file not found on disk', 404)

      return SuccessProcess(filePath, 200)
    } catch (error) {
      return FailureProccess('', 500)
    }
  }
}
