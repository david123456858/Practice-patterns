import { Images } from '../entities/Images'

export interface BuilderImages {
  setIdImages: (id: string) => void
  setFileName: (name: string) => void
  setFilePath: (path: string) => void
  setFileSize: (size: string) => void
  setWidth: (width: number) => void
  setHeight: (height: number) => void
  setUpdatedAt: (date: Date) => void
  setCreatedAt: (date: Date) => void
  build: () => Images
}
