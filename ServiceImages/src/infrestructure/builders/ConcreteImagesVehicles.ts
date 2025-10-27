
import { ImagesVehicle } from '../../domain/entities/ImagesVehicle.js'
import { BuilderImages } from '../../domain/interfaces/builderImages.js'

export class ConcreteBuilderImagesVehicles implements BuilderImages {
  private idVehicle!: string
  private idImages!: string
  private fileName!: string
  private filePath!: string
  private fileSize!: number
  private width!: number
  private height!: number
  private updated_at!: Date
  private created_at!: Date

  setIdImages (id: string): void {
    this.idImages = id
  }

  setFileName (name: string): void {
    this.fileName = name
  }

  setFilePath (path: string): void {
    this.filePath = path
  }

  setFileSize (size: number): void {
    this.fileSize = size
  }

  setWidth (width: number): void {
    this.width = 300
  }

  setHeight (height: number): void {
    this.height = 300
  }

  setUpdatedAt (date: Date): void {
    this.updated_at = date
  }

  setCreatedAt (date: Date): void {
    this.created_at = date
  }

  setVehicleId (id: string): void {
    this.idVehicle = id
  }

  build (): ImagesVehicle {
    return new ImagesVehicle(
      this.idVehicle,
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
