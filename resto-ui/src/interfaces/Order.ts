import { Menu } from "./Menu";

export interface Order {
  name: string;
  items: Menu[];
  id: number;
  completed: boolean;
  createTime: string;
  payment: Payment;
  finalPrice: number;
}

export interface Payment {
  cardNumber: string;
  cardName: string;
  cardCvc: string;
  cardExpiry: string;
}
