import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Budget } from './entities/budget.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Budget])],
  controllers: [BudgetsController],
  providers: [BudgetsService],
  exports: [BudgetsService],
})
export class BudgetsModule {}
