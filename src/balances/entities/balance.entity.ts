import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Balance {
  @PrimaryKey()
  id: number;

  @Property()
  sourceName: string;

  @Property()
  accountNumber?: string;

  @Property()
  balanceAmount: number;

  @Property()
  currency: string;

  @ManyToOne(() => User)
  user!: User;

  @Property({ onUpdate: () => new Date() })
  lastUpdated: Date = new Date();

  @Property({ nullable: true })
  description?: string;
}
