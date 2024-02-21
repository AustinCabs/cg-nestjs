import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('event')
export class EventController {
  // private readonly eventService: EventService,
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    // return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return "powert!"
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    // return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.eventService.remove(+id);
  }
}
