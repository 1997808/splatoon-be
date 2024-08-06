import { Migration } from '@mikro-orm/migrations';

export class Migration20240806075040 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "balance" ("id" serial primary key, "source_name" varchar(255) not null, "balance_amount" int not null, "currency" varchar(255) not null, "user_id" int not null, "last_updated" timestamptz not null, "description" varchar(255) null);',
    );

    this.addSql(
      'alter table "balance" add constraint "balance_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "balance" cascade;');
  }
}
