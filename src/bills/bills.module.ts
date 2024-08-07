import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Bill } from './entities/bill.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Bill])],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
