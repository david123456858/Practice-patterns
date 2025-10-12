import { ImagesVehicle } from '../../domain/entities/ImagesVehicle'
import { OperationsImages } from '../../domain/interfaces/OperationsBase'

const vectorImagesInfo: ImagesVehicle[] = []

export class repositoryImages implements OperationsImages<ImagesVehicle> {
  async upload (payload: ImagesVehicle): Promise<ImagesVehicle> {
    vectorImagesInfo.push(payload)
    console.log(vectorImagesInfo)

    return payload
  }

  async get (): Promise<void> {

  }

  async getById (id: string): Promise<ImagesVehicle | undefined> {
    return vectorImagesInfo.find((image) => image.getIdImages() === id)
  }

  async getByIdVehicle (id: string): Promise<ImagesVehicle | undefined> {
    return vectorImagesInfo.find((image) => image.getIdVehicle() === id)
  }

  async delete (): Promise<void> {

  }
}
