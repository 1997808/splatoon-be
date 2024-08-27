export class TransactionDto {
  id: number;
  item: string;
  description?: string;
  amount: number;
  type: 'income' | 'expense';
  balance: number;
  user: number;
  category: number;
  transactionDate: Date;
}
