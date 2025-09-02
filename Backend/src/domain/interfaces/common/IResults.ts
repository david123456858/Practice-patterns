export interface ISuccesProcess<T> {
  value: T
  statusCode: number
  success: true
}

export interface IFailureProcess<T> {
  error: T
  statusCode: number
  success: false
}
