import { Migration } from '@mikro-orm/migrations';

export class Migration20240806081711 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "balance" add column "account_number" varchar(255) null;',
    );

    this.addSql('alter table "transaction" add column "balance_id" int null;');
    this.addSql(
      'alter table "transaction" add constraint "transaction_balance_id_foreign" foreign key ("balance_id") references "balance" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint "transaction_balance_id_foreign";',
    );

    this.addSql('alter table "balance" drop column "account_number";');

    this.addSql('alter table "transaction" drop column "balance_id";');
  }
}
