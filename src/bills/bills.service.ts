import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Bill } from './entities/bill.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../util/page.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: EntityRepository<Bill>,
    private readonly em: EntityManager,
  ) {}

  async create(createBillDto: CreateBillDto) {
    const createdBill = this.billRepository.create(createBillDto);
    return await this.billRepository.insert(createdBill);
  }

  async findAll(pageOptionsDto: PageOptionsDto, userId: number) {
    const { order, take, skip } = pageOptionsDto;
    const result = await this.em
      .createQueryBuilder(Bill)
      .select('*')
      .where({ user: userId })
      .leftJoinAndSelect('balance', 'balance')
      .limit(take, skip)
      .orderBy({ dueDate: order })
      .getResultAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: result[1],
      pageOptionsDto,
    });
    return new PageDto(result[0], pageMetaDto);
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
    const result = await this.billRepository
      .getEntityManager()
      .persistAndFlush(existingBill);
    return result;
  }

  async remove(id: number) {
    const bill = await this.billRepository.findOne({ id });
    await this.billRepository.nativeDelete(bill);
  }
}
