import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: EntityRepository<Asset>,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    const createdAsset = this.assetRepository.create(createAssetDto);
    return await this.assetRepository.insert(createdAsset);
  }

  async findAll() {
    return await this.assetRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.assetRepository.findOne({ id });
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    const existingAsset = await this.assetRepository.findOne({ id });
    wrap(existingAsset).assign(updateAssetDto);
    await this.assetRepository.upsert(existingAsset);
    return existingAsset;
  }

  async remove(id: number) {
    const asset = await this.assetRepository.findOne({ id });
    await this.assetRepository.nativeDelete(asset);
  }

  async initAssets(userId: number) {
    const assets = ['Bank Card', 'Cash'];
    const createdAssets = assets.map((assetName: string) => {
      return this.assetRepository.create({
        name: assetName,
        balance: 0,
        user: userId,
      });
    });
    return await this.assetRepository.insertMany(createdAssets);
  }
}
