import { Migration } from '@mikro-orm/migrations';

export class Migration20240807035249 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "bill" ("id" serial primary key, "logo" varchar(255) null, "item" varchar(255) not null, "description" text null, "amount" numeric(15,2) not null, "type" text check ("type" in (\'income\', \'expense\')) not null, "balance_id" int not null, "user_id" int not null, "category_id" int not null, "status" text check ("status" in (\'active\', \'deactive\')) not null, "frequency_value" int not null, "frequency_unit" varchar(255) not null, "currency" varchar(255) not null, "due_date" date not null);',
    );
    this.addSql(
      'alter table "bill" add constraint "bill_balance_id_foreign" foreign key ("balance_id") references "balance" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "bill" add constraint "bill_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "bill" add constraint "bill_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "bill" cascade;');
  }
}
