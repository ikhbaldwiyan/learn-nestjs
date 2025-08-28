import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@Controller('api/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
