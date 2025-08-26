import { Controller, Get, Post, Param, Query, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';

@Controller('api/users')
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection,
  ) {}
  
  @Get('/connection')
  getConnection(): string {
    return this.connection.getName();
  }

  @Post()
  createUser(): string {
    return 'User created';
  }

  @Get('/list')
  findAllUsers(): Record<string, string> {
    return {
      data: 'Hello World',
    };
  }

  @Get('/hello')
  hello(@Query('name') name: string): Record<string, string> {
    return this.userService.sayHello(name);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string, @Query('name') name: string): string {
    return `Get user with ID: ${id} and name: ${name}`;
  }
}
