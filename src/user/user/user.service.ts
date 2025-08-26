import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHello(name: string): Record<string, string> {
    return {
      data: `Hello ${name}`
    }
  }
}
