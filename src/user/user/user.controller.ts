import {
  Controller,
  Get,
  Post,
  Param,
  Inject,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { MemberService } from '../member/member.service';
import { CreateUserDto } from '../dto/user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { ApiKeyGuard } from '../../guard/api-key-guard';

@Controller('api/users')
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private memberService: MemberService,
  ) {}

  @Get('/connection')
  getConnection(): string {
    this.mailService.send();
    this.emailService.send();

    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();

    return this.connection.getName();
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.userService.createUser(createUserDto);

      return {
        sucess: true,
        message: 'User successfully created',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    try {
      const user = this.userService.getUserDetail(id);
      return user;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAllUsers() {
    try {
      const data = await this.userService.findAll();
      return {
        data,
        message: 'User Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.updateUser(id, updateUserDto);
      return {
        success: true,
        message: 'User Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  removeUserById(@Param('id') id: string) {
    try {
      this.userService.removeUser(id);
      return {
        success: true,
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
