import { Menu } from "./Menu";

export interface Order {
  name: string;
  items: Menu[];
  id: number;
  completed: boolean;
  createTime: string;
  payment: Payment;
}

export interface Payment {
  cardNumber: string;
  cardName: string;
  cardCvc: string;
  total: number;
  cardExpiry: string;
}
