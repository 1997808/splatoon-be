export class CreateTransactionDto {
  item: string;
  description?: string;
  amount: number;
  type: 'income' | 'expense';
  userId: number;
  categoryId: number;
  transactionDate: Date;
}
