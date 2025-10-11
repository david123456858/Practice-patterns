import { NextFunction, Request, Response } from 'express'
export class ImagesController {
  constructor () {
    this.get.bind(this.get)
    this.upload.bind(this.upload)
    this.delete.bind(this.delete)
    this.getById.bind(this.getById)
  }

  async upload (req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).json({ message: 'calmate estamos en contruccui' })
  }

  async get (req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).json({ message: 'calmate estamos en contruccui' })
  }

  async getById (req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).json({ message: 'calmate estamos en contruccui' })
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).json({ message: 'calmate estamos en contruccui' })
  }
}
