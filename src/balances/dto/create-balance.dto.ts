export class CreateBalanceDto {
  sourceName: string;
  balanceAmount: number;
  accountNumber?: string;
  currency: string;
  description?: string;
  user: number;
}
