import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Budget {
  @PrimaryKey()
  id: number;

  @ManyToOne(() => User)
  user!: User;

  @Property()
  month: number;

  @Property()
  year: number;

  @Property()
  budgetAmount: number;

  @Property()
  totalExpenses: number;
}
