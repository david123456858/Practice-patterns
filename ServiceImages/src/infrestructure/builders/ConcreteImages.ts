import { Images } from '../../domain/entities/Images'
import { BuilderImages } from '../../domain/interfaces/builderImages'

export class ConcreteBuilderImages implements BuilderImages {
  idImages!: string
  fileName!: string
  filePath!: string
  fileSize!: string
  width!: number
  height!: number
  updated_at!: Date
  created_at!: Date

  setIdImages (id: string): void {
    this.idImages = id
  }

  setFileName (name: string): void {
    this.fileName = name
  }

  setFilePath (path: string): void {
    this.filePath = path
  }

  setFileSize (size: string): void {
    this.fileSize = size
  }

  setWidth (width: number): void {
    this.width = width
  }

  setHeight (height: number): void {
    this.height = height
  }

  setUpdatedAt (date: Date): void {
    this.updated_at = date
  }

  setCreatedAt (date: Date): void {
    this.created_at = date
  }

  build (): Images {
    return new Images(
      this.idImages,
      this.fileName,
      this.filePath,
      this.fileSize,
      this.width,
      this.height,
      this.updated_at,
      this.created_at
    )
  }
}
