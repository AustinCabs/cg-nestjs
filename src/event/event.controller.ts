import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, UsePipes, ValidationPipe, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('event')
export class EventController {
  // private readonly eventService: EventService,
  private readonly logger = new Logger(EventController.name)
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) { }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const { name, description, when, address } = createEventDto
    const newEvent = await this.repository.create({ name, description, when, address })
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

  // @HttpCode(204)
  @Patch(':id')
  // @UsePipes(ValidationPipe) // no need for this if ValidationPipes on Globally add
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateEventDto: UpdateEventDto) {
    const findEvent = await this.repository.findOne({
      where: {
        id
      }
    })
    this.logger.debug(`find event: ${typeof findEvent} | ${JSON.stringify(findEvent)}`)

    if (findEvent === null) {
      throw new NotFoundException('Event not Found')
    }

    try {
      this.logger.debug(`Merge event`)
      const mergeEvent = await this.repository.merge(findEvent, updateEventDto)
      console.log(mergeEvent);
      

      this.logger.debug(`Update event`)
      const updatedEvent = await this.repository.save(mergeEvent)
      console.log(updatedEvent);
      // return updatedEvent
      return {
        message: "Succesfully updated"
      }

    } catch (error) {
      this.logger.debug(`Catch Update`)
      throw new BadRequestException('Failed update')
    }

  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const findEvent = await this.repository.findOne({
      where: {
        id
      }
    })
    this.logger.debug(`find event: ${typeof findEvent} | ${JSON.stringify(findEvent)}`)

    if (findEvent === null) {
      throw new NotFoundException('Event not Found')
    }
    try {
      
    } catch (error) {
      
    }
  }
}
