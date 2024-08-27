import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { Balance } from '../../balances/entities/balance.entity';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Bill {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  logo?: string;

  @Property()
  item!: string;

  @Property({ nullable: true, type: 'text' })
  description?: string;

  @Property({ type: 'decimal', precision: 15, scale: 2 })
  amount!: number;

  @Enum({ items: () => TransactionType })
  type!: 'income' | 'expense';

  @ManyToOne(() => Balance)
  balance!: Balance;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Category)
  category!: Category;

  @Enum({ items: () => BillStatus })
  status: 'active' | 'deactive';

  @Property()
  frequencyValue!: number;

  @Property()
  frequencyUnit!: string;

  @Property()
  currency!: string;

  @Property({ type: 'date' })
  dueDate!: Date;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum BillStatus {
  ACTIVE = 'active',
  DEACTIVE = 'deactive',
}
