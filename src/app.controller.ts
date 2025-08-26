import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('say-hello')
  sayHello(@Query('name') name: string): Record<string, string> {
    return this.userService.sayHello(name);
  }
}
