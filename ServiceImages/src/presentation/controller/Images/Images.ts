import { NextFunction, Request, Response } from 'express'
import { ServiceImages } from '../../../aplication/case-use/caseUseImages'
import path from 'path'

export class ImagesController {
  constructor (private readonly service: ServiceImages) {
    this.upload = this.upload.bind(this)
    this.getVehicleById = this.getVehicleById.bind(this)
    this.delete = this.delete.bind(this)
    this.get = this.get.bind(this)
    this.getById = this.getById.bind(this)
    this.serveImage = this.serveImage.bind(this)
  }

  async upload (req: Request, res: Response, next: NextFunction): Promise<void> {
    const detalisFile = req.file
    const result = await this.service.upload(detalisFile)

    if (!result.success) {
      console.log(result.error)

      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async get (req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.service.get()

    if (!result.success) {
      console.log(result.error)

      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getById (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.service.getById(id)
    if (!result.success) {
      console.log(result.error)

      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async getVehicleById (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const result = await this.service.getById(id)
    if (!result.success) {
      console.log(result.error)

      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).json({ message: result.value })
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).json({ message: 'calmate estamos en contruccui' })
  }

  async serveImage (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { imageId } = req.params
    console.log(imageId)

    const result = await this.service.serveImage(imageId)
    if (!result.success) {
      console.log(result.error)

      res.status(result.status).json({ error: result.error })
      return
    }
    res.status(result.status).sendFile(path.resolve(result.value))
  }
}
