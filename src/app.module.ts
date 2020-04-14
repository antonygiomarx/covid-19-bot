import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Webhook } from './controllers/webhook.controller';

@Module({
  imports: [],
  controllers: [AppController, Webhook],
  providers: [AppService]
})
export class AppModule {}
