import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password, 10);
    const userData = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find()
    return users?.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email
    }))
  }

  async getUserDetail(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Hash password if it's being updated
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }
    await this.userRepository.update({ id }, updateUserDto);
    return this.getUserDetail(id);
  }

  async removeUser(id: string): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.remove(existingUser);
  }
}
