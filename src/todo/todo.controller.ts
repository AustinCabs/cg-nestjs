import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }
  private todo: Todo[] = []

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {

    this.todo.push(
      {
        id: this.todo.length + 1,
        description: createTodoDto.description
      }
    )
    return createTodoDto;
  }

  @Get()
  findAll() {
    return this.todo
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todo.find(todo => todo.id == id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    const updateTodo = this.todo.find(todo => todo.id == id)
    if (!updateTodo) {
      return "Something went wrong when updating"
    }
    updateTodo.description = updateTodoDto.description
    return updateTodo
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    const delTodo = this.todo.filter(todo => todo.id != id)
    this.todo = delTodo
    console.log("# parm", id);
    console.log("# delete", delTodo);

    return delTodo;
  }
}
