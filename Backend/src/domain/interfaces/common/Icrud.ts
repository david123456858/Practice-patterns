export interface ICrudOperations <T> {
  save: (data: T) => void
  delete: (id: string) => void
  update: (data: T) => void
  findById: (id: string) => T | undefined
  findAll: () => T[]
}
