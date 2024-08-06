import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../category/entities/category.entity';
import { Balance } from '../../balances/entities/balance.entity';

@Entity()
export class Transaction {
  @PrimaryKey()
  id!: number;

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

  @Property({ type: 'date' })
  transactionDate!: Date;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
