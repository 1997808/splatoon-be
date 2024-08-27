export class BillDto {
  id: number;
  logo?: string;
  item: string;
  description?: string;
  amount: number;
  type: 'income' | 'expense';
  balance: any;
  user: number;
  category: number;
  status: 'active' | 'deactive';
  frequencyValue: number;
  frequencyUnit: string;
  currency: string;
  dueDate: Date;
}
