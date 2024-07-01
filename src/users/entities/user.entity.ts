import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  userId!: number;

  @Property({ unique: true })
  username!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  passwordHash!: string;

  @Property({ nullable: true })
  fullName?: string;

  @Property({ nullable: true, type: 'date' })
  birthdate?: Date;

  @Property({ nullable: true })
  avatarUrl?: string;

  @Property()
  timezone!: string;

  @Property()
  languagePreference!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();
}
