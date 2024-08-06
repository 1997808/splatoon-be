import { Migration } from '@mikro-orm/migrations';

export class Migration20240806091405 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "budget" ("id" serial primary key, "user_id" int not null, "month" int not null, "year" int not null, "budget_amount" int not null, "total_expenses" int not null);');

    this.addSql('alter table "budget" add constraint "budget_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "budget" cascade;');
  }

}
