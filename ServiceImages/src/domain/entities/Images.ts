/* eslint-disable @typescript-eslint/naming-convention */
export class Images {
  private readonly idImages: string
  private fileName: string
  private filePath: string
  private fileSize: string
  private width: number
  private height: number
  private updated_at: Date
  private readonly created_at: Date

  constructor (
    idImages: string,
    fileName: string,
    filePath: string,
    fileSize: string,
    width: number,
    height: number,
    updated_at: Date,
    created_at: Date
  ) {
    this.idImages = idImages
    this.fileName = fileName
    this.filePath = filePath
    this.fileSize = fileSize
    this.width = width
    this.height = height
    this.updated_at = updated_at
    this.created_at = created_at
  }

  // ✅ Getters
  getIdImages (): string {
    return this.idImages
  }

  getFileName (): string {
    return this.fileName
  }

  getFilePath (): string {
    return this.filePath
  }

  getFileSize (): string {
    return this.fileSize
  }

  getWidth (): number {
    return this.width
  }

  getHeight (): number {
    return this.height
  }

  getUpdatedAt (): Date {
    return this.updated_at
  }

  getCreatedAt (): Date {
    return this.created_at
  }

  // ✅ Setters (opcional si quieres permitir actualización)
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
}
