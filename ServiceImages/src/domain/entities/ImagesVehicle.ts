/* eslint-disable @typescript-eslint/naming-convention */
import { Images } from './Images'

export class ImagesVehicle extends Images {
  private IdVehicle: string

  constructor (
    IdVehicle: string,
    idImages: string,
    fileName: string,
    filePath: string,
    fileSize: number,
    width: number,
    height: number,
    updated_at: Date,
    created_at: Date) {
    super(idImages, fileName, filePath, fileSize, width, height, updated_at, created_at)
    this.IdVehicle = IdVehicle
  }

  setIdVehicle (id: string): void {
    this.IdVehicle = id
  }

  getIdVehicle (): string {
    return this.IdVehicle
  }
}
