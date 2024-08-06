import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: EntityRepository<Budget>,
  ) {}

  async create(createBudgetDto: CreateBudgetDto) {
    const createdBudget = this.budgetRepository.create(createBudgetDto);
    return await this.budgetRepository.insert(createdBudget);
  }

  async findOne(userId: number) {
    return await this.budgetRepository.findOne({ user: userId });
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
    const existingBudget = await this.budgetRepository.findOne({ id });
    wrap(existingBudget).assign(updateBudgetDto);
    await this.budgetRepository.upsert(existingBudget);
    return existingBudget;
  }

  async remove(id: number) {
    const budget = await this.budgetRepository.findOne({ id });
    await this.budgetRepository.nativeDelete(budget);
  }

  async initBudgets(userId: number) {
    return await this.create({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      budgetAmount: 0,
      totalExpenses: 0,
      user: userId,
    });
  }
}
