import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [TodoModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
