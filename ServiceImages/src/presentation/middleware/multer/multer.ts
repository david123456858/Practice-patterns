/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, RequestHandler, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

export class MulterManagament {
  private readonly storage: multer.StorageEngine
  public uploadConfig: RequestHandler
  private readonly fullPath: string

  constructor () {
    this.fullPath = path.join(process.cwd(), '/upload')
    this.createDir()
    this.storage = this.ConfigStorage()
    this.uploadConfig = this.ConfigUpload()

    this.upload = this.upload.bind(this)
  }

  private ConfigStorage (): multer.StorageEngine {
    const path = this.fullPath
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path)
      },
      filename: function (req, file, cb) {
        // Obtener la extensión del archivo original
        const fileExtension = file.originalname.split('.').pop()
        // Obtener el nombre base sin la extensión
        const baseName = file.originalname.replace(`.${fileExtension}`, '')
        // Crear el nuevo nombre con el timestamp entre el nombre base y la extensión
        const newFileName = `${baseName}-${Date.now()}.${fileExtension}`
        cb(null, newFileName)
      }
    })
  }

  private ConfigUpload (): RequestHandler {
    return multer({ storage: this.storage }).single('file')
  }

  private createDir (): void {
    if (!fs.existsSync(this.fullPath)) {
      fs.mkdirSync(this.fullPath, { recursive: true })
    }
  }

  public async upload (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.uploadConfig(req, res, (error: any) => {
        if (error instanceof multer.MulterError) {
          return res.status(400).json({
            success: false,
            message: 'Error al procesar el archivo',
            detail: error.message
          })
        }

        if (error) {
          console.error('Error al subir archivo:', error)
          return res.status(500).json({
            success: false,
            message: 'Error interno al procesar el archivo'
          })
        }

        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: 'No se ha enviado ningún archivo',
            detail: 'Debe enviar un archivo en el campo "file"'
          })
        }
        next()
      })
    } catch (error) {
      console.error('Error crítico en el middleware:', error)
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      })
    }
  }
}
