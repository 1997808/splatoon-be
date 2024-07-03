import { Migration } from '@mikro-orm/migrations';

export class Migration20240703035153 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" serial primary key, "name" varchar(255) not null, "is_highlight" boolean not null);');

    this.addSql('create table "transaction" ("id" serial primary key, "item" varchar(255) not null, "description" text null, "amount" numeric(15,2) not null, "type" text check ("type" in (\'income\', \'expense\')) not null, "user_id" int not null, "category_id" int not null, "transaction_date" date not null);');

    this.addSql('alter table "transaction" add constraint "transaction_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "transaction" add constraint "transaction_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "transaction" drop constraint "transaction_category_id_foreign";');

    this.addSql('drop table if exists "category" cascade;');

    this.addSql('drop table if exists "transaction" cascade;');
  }

}
