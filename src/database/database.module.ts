import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          dbName: configService.get('DATABASE_NAME'),
          user: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          driver: PostgreSqlDriver,
          entities: ['./dist/**/*.entity.js'],
          entitiesTs: ['./src/**/*.entity.ts'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
