import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Header,
} from '@nestjs/common';
import { MobileSpecService } from './mobile-spec.service';
import { CreateMobileSpecDto } from './dto/create-mobile-spec.dto';
import { UpdateMobileSpecDto } from './dto/update-mobile-spec.dto';

@Controller('mobile-spec')
export class MobileSpecController {
  constructor(private readonly mobileSpecService: MobileSpecService) {}

  @Post()
  create(@Body() createMobileSpecDto: CreateMobileSpecDto) {
    return this.mobileSpecService.create(createMobileSpecDto);
  }

  @Get('/header/')
  @Header(
    'Accept-CH',
    'Sec-CH-UA-Model, Sec-CH-UA-Platform, Device-Memory, Sec-CH-UA, Sec-CH-UA-Arch, Sec-CH-UA-Full-Version, Sec-CH-UA-Mobile, Sec-CH-UA-Platform-Version, Viewport-Width, Width',
  )
  getHeaders(@Headers() headers: any) {
    return `Header: ${JSON.stringify(headers)}`;
  }

  @Get()
  findAll() {
    return this.mobileSpecService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mobileSpecService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMobileSpecDto: UpdateMobileSpecDto,
  ) {
    return this.mobileSpecService.update(+id, updateMobileSpecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobileSpecService.remove(+id);
  }
}
