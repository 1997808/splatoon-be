import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoryModule } from './category/category.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, AuthModule, TransactionsModule, CategoryModule, AssetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
