import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SmeController } from './sme/sme.controller';
import { databaseProviders } from './database.provider';
import { SMEService } from './sme/sme.service';
import { smeProviders } from './sme/sme.providers';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    HttpModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],

  controllers: [AppController, SmeController],
  providers: [SMEService, ...smeProviders, ...databaseProviders],
})
export class AppModule {}
