import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'

export const FailureProccess = <T>(
  error: T,
  status: number
): IFailureProcess<T> => ({
    error,
    success: false,
    status
  })

export const SuccessProcess = <T>(
  value: T,
  status: number
): ISuccessProcess<T> => ({
    value,
    success: true,
    status
  })
