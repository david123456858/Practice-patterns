import { IFailureProcess, ISuccessProcess } from '../../../domain/interfaces/common/IResults'

export const FailureProcess = <T>(
  error: T,
  statusCode: number): IFailureProcess<T> => ({
    statusCode,
    error,
    success: false
  })

export const SuccessProcess = <T>(
  value: T,
  statusCode: number): ISuccessProcess<T> => ({
    statusCode,
    value,
    success: true
  })
