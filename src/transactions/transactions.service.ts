import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: EntityRepository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const createdTransaction =
      this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.insert({
      ...createdTransaction,
      user: createTransactionDto.userId,
      category: createTransactionDto.categoryId,
    });
  }

  async findAll() {
    return await this.transactionRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.transactionRepository.findOne({ id });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const existingTransaction = await this.transactionRepository.findOne({
      id,
    });
    wrap(existingTransaction).assign(updateTransactionDto);
    await this.transactionRepository.upsert(existingTransaction);
    return existingTransaction;
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({ id });
    await this.transactionRepository.nativeDelete(transaction);
  }
}
