import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class AbstractEntity {
  @PrimaryKey()
  id!: number;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();
}
