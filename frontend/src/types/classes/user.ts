import type { Subscription } from "./subscription";

export interface User {
  id: string;
  cc: string;
  name: string;
  email: string;
  subscription: Subscription;
}