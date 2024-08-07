export class CreateBillDto {
  logo?: string;
  item: string;
  description?: string;
  amount: number;
  type: 'income' | 'expense';
  balance: number;
  user: number;
  category: number;
  status: 'active' | 'deactive';
  frequencyValue: number;
  frequencyUnit: string;
  currency: string;
  dueDate: Date;
}
