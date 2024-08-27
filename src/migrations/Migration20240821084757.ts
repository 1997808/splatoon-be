import { Migration } from '@mikro-orm/migrations';

export class Migration20240821084757 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "currency" varchar(255) null, add column "theme" varchar(255) null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user" drop column "currency", drop column "theme";',
    );
  }
}
