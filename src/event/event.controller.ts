import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
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
  async create(@Body() createEventDto: CreateEventDto) {
    const {name,description,when,address} = createEventDto
    const newEvent = await this.repository.create({name,description,when,address})
    return this.repository.save(newEvent)
  }

  @Get()
  async findAll() {
    return this.repository.find()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.repository.find({
      where: {
        id
      }
    })
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
