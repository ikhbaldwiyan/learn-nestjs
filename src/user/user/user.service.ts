import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userData = this.userRepository.create(createUserDto);
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserDetail(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const existingUser = await this.getUserDetail(id);

    const userData = this.userRepository.merge(
      existingUser,
      updateUserDto,
    )

    return await this.userRepository.save(userData)

  }

  async removeUser(id: string): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new Error('User not found');
    }
    return this.userRepository.remove(existingUser);
  }
}
