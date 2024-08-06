export class CreateTransactionDto {
  item: string;
  description?: string;
  amount: number;
  type: 'income' | 'expense';
  user: number;
  category: number;
  balance: number;
  transactionDate: Date;
}
