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
    const createdUser = this.userRepository.create(createUserDto);
    return await this.userRepository.insert(createdUser);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ id }, { exclude: ['password'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({ id });
    wrap(existingUser).assign(updateUserDto);
    const result = await this.userRepository
      .getEntityManager()
      .persistAndFlush(existingUser);
    return result;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ id });
    await this.userRepository.nativeDelete(user);
  }
}
