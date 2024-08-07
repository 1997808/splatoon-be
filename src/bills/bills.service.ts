import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: EntityRepository<Bill>,
  ) {}

  async create(createBillDto: CreateBillDto) {
    const createdBill = this.billRepository.create(createBillDto);
    return await this.billRepository.insert(createdBill);
  }

  async findAll(userId: number) {
    return await this.billRepository.find({ user: userId });
  }

  async findOneById(id: number) {
    return await this.billRepository.findOne({ id });
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const existingBill = await this.billRepository.findOne({
      id,
    });
    if (!existingBill) {
      throw new Error('Bill not found');
    }
    wrap(existingBill).assign(updateBillDto);
    await this.billRepository.upsert(existingBill);
    return existingBill;
  }

  async remove(id: number) {
    const bill = await this.billRepository.findOne({ id });
    await this.billRepository.nativeDelete(bill);
  }
}
