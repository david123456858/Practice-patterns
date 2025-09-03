export const TypesPricePeriods = {
  ANNUAL: 'ANNUAL',
  MONTH: 'MONTH',
  SEMIANNUAL: 'SEMIANNUAL'
} as const;

export type TypesPricePeriods = typeof TypesPricePeriods[keyof typeof TypesPricePeriods];