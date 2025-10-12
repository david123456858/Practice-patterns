import { ConcreteBuilderImagesVehicles } from '../../infrestructure/builders/ConcreteImagesVehicles'

import { randomUUID } from 'crypto'
export class DirectorImages {
  private builder!: ConcreteBuilderImagesVehicles

  public SetBuilder (builder: ConcreteBuilderImagesVehicles): void {
    this.builder = builder
  }

  public async createImagesVehicle (payload: Express.Multer.File, idVehicle: string): Promise<void> {
    this.builder.setVehicleId(idVehicle)
    this.builder.setFileName(payload.filename)
    this.builder.setFilePath(payload.path)
    this.builder.setFileSize(payload.size)
    this.builder.setIdImages(randomUUID())
    this.builder.setCreatedAt(new Date())
    this.builder.setUpdatedAt(new Date())
  }
}
