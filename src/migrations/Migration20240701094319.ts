import { Migration } from '@mikro-orm/migrations';

export class Migration20240701094319 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("user_id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "avatar_url" varchar(255) null, "created_at" timestamptz not null);',
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );
  }
}
