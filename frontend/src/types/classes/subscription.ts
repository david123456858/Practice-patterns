import { TypesPricePeriods } from "../enums/TypesPricePeriods";

export interface Subscription {
  id: string;
  pricing: number;
  period: TypesPricePeriods;
}
