import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './entities/balance.entity';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: EntityRepository<Balance>,
  ) {}

  async create(createBalanceDto: CreateBalanceDto) {
    const createdBalance = this.balanceRepository.create(createBalanceDto);
    return await this.balanceRepository.insert(createdBalance);
  }

  async findAll() {
    return await this.balanceRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.balanceRepository.findOne({ id });
  }

  async update(id: number, updateBalanceDto: UpdateBalanceDto) {
    const existingBalance = await this.balanceRepository.findOne({ id });
    wrap(existingBalance).assign(updateBalanceDto);
    await this.balanceRepository.upsert(existingBalance);
    return existingBalance;
  }

  async remove(id: number) {
    const balance = await this.balanceRepository.findOne({ id });
    await this.balanceRepository.nativeDelete(balance);
  }

  async initBalances(userId: number) {
    const balances = ['Bank Card', 'Cash'];
    const createdBalances = balances.map((balanceName: string) => {
      return this.balanceRepository.create({
        sourceName: balanceName,
        balanceAmount: 0,
        user: userId,
      });
    });
    return await this.balanceRepository.insertMany(createdBalances);
  }
}
