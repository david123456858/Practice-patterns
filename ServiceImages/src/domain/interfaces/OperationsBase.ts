export interface OperationsImages<T> {
  upload: (payload: T) => any
  get: () => any
  getById: (id: string) => any
  delete: (id: string) => any
}
