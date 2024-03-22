import { Injectable } from '@nestjs/common';
import { CreateMobileSpecDto } from './dto/create-mobile-spec.dto';
import { UpdateMobileSpecDto } from './dto/update-mobile-spec.dto';

@Injectable()
export class MobileSpecService {
  create(createMobileSpecDto: CreateMobileSpecDto) {
    return `This action adds a new mobileSpec ${JSON.stringify(createMobileSpecDto)}`;
  }

  findAll() {
    return `This action returns all mobileSpec`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobileSpec`;
  }

  update(id: number, updateMobileSpecDto: UpdateMobileSpecDto) {
    return `This action updates a #${id + JSON.stringify(updateMobileSpecDto)} mobileSpec`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobileSpec`;
  }
}
