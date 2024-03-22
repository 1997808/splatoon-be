import { Module } from '@nestjs/common';
import { MobileSpecService } from './mobile-spec.service';
import { MobileSpecController } from './mobile-spec.controller';

@Module({
  controllers: [MobileSpecController],
  providers: [MobileSpecService],
})
export class MobileSpecModule {}
