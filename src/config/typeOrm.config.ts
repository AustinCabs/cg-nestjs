import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Attendee } from "src/event/entities/attendee.entity";
import { Event } from "src/event/entities/event.entity";


export default ():TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, //orginal = root because i change it using local mysql
  database: process.env.DB_DATABASE,
  entities: [Event, Attendee],
  synchronize: true
})
