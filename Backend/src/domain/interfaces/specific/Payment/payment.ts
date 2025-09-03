export interface Payment {
  doPay: (amount: number, amountForPay: number) => any
}
