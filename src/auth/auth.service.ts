import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entites/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const { password, ...userWithoutPassword } = user;

    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      message: 'Login successful',
      data: userWithoutPassword,
      access_token: access_token,
    };
  }
}
