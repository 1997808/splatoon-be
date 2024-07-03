import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.insert(createdCategory);
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.categoryRepository.findOne({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({ id });
    wrap(existingCategory).assign(updateCategoryDto);
    await this.categoryRepository.upsert(existingCategory);
    return existingCategory;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ id });
    await this.categoryRepository.nativeDelete(category);
  }
}
