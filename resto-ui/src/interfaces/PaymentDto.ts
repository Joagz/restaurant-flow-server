export interface PaymentDto {
  fullName: string;
  expirationDate: string;
  cardType: string;
  company: string;
  cardNumber: string;
  total: number;
  securityCode: string;
}
