/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, RequestHandler, Response } from 'express'
import multer from 'multer'
import path from 'path'

export class MulterManagament {
  private readonly storage: multer.StorageEngine
  public uploadConfig: RequestHandler
  private readonly fullPath: string

  constructor () {
    this.fullPath = path.join(process.cwd(), '/upload')
    this.storage = this.ConfigStorage()
    this.uploadConfig = this.ConfigUpload()
  }

  private ConfigStorage (): multer.StorageEngine {
    const path = this.fullPath
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path)
      },
      filename: function (req, file, cb) {
        cb(null, `${file.filename}`)
      }
    })
  }

  private ConfigUpload (): RequestHandler {
    return multer({ storage: this.storage }).single('file')
  }

  public async upload (req: Request, res: Response, next: NextFunction): Promise<void> {
    this.uploadConfig(req, res, (error: any) => {
      if (error instanceof multer.MulterError) {
        res.status(500).json({
          message: 'vuelva a intentar mas tarde hubo un error',
          detail: 'No se pudo subir la imagen'
        })
      }

      if (error) {
        res.status(500).json({ message: 'vuelva a intentar mas tarde hubo un error' })
      }

      next()
    })
  }
}
