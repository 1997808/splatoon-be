import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Asset } from './entities/asset.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Asset])],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [AssetsService],
})
export class AssetsModule {}
