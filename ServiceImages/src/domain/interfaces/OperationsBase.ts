export interface OperationsImages<T> {
  upload: (payload: T) => T
  get: () => any
  getById: (id: string) => any
  delete: (id: string) => any
}
