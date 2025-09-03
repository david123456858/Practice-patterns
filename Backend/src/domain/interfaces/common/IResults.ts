export interface IFailureProcess<T> {
  error: T
  success: false
  status: number
}
export interface ISuccessProcess<T> {
  value: T
  success: true
  status: number
}
