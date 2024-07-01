import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ userId: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({ userId: id });
    wrap(existingUser).assign(updateUserDto);
    await this.userRepository.upsert(existingUser);
    return existingUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ userId: id });
    await this.userRepository.nativeDelete(user);
  }
}
