import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Asset {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  icon?: string;

  @Property({ nullable: true })
  accountNumber?: string;

  @Property({ type: 'decimal', precision: 15, scale: 2 })
  balance!: number;

  @ManyToOne(() => User)
  user!: User;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();
}
