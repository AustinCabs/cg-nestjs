import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event/entities/event.entity';
import { EventController } from './event/event.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234', //orginal = root because i change it using local mysql
    database: 'cgtraining',
    entities: [Event],
    synchronize: true
  }),
  TypeOrmModule.forFeature([Event]),
    TodoModule,
    EventModule],
  controllers: [AppController, EventController],
  providers: [AppService],
})
export class AppModule { }
