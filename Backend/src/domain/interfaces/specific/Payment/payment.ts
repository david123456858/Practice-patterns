export interface Payment {
  doPay: (amount: number, amountForPay: number) => any
}

export interface IPaymentProcessor {
  doPay: (amount: number) => any
}
