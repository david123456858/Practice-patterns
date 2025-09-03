import { IFailureProcess, ISuccessProcess } from './IResults'

export interface IServicesOperations {
  create: (data: any) => Promise<ISuccessProcess<any> | IFailureProcess<any>>
  getAll: () => Promise<ISuccessProcess<any> | IFailureProcess<any>>
  getById: (id: string) => Promise<ISuccessProcess<any> | IFailureProcess<any>>
  delete: (id: string) => Promise<ISuccessProcess<any> | IFailureProcess<any>>
  update: (id: string, data: any) => Promise<ISuccessProcess<any> | IFailureProcess<any>>
}
