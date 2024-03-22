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
    'Device-Memory,Downlink,DPR,ECT,RTT,Save-Data,Sec-CH-Device-Memory,Sec-CH-Downlink,Sec-CH-DPR,Sec-CH-ECT,Sec-CH-Forced-Colors,Sec-CH-Prefers-Color-Scheme,Sec-CH-Prefers-Contrast,Sec-CH-Prefers-Reduced-Data,Sec-CH-Prefers-Reduced-Motion,Sec-CH-Prefers-Reduced-Transparency,Sec-CH-RTT,Sec-CH-Save-Data,Sec-CH-UA,Sec-CH-UA-Arch,Sec-CH-UA-Bitness,Sec-CH-UA-Full-Version,Sec-CH-UA-Full-Version-List,Sec-CH-UA-Mobile,Sec-CH-UA-Model,Sec-CH-UA-Platform,Sec-CH-UA-Platform-Version,Sec-CH-UA-WoW64,Sec-CH-Viewport-Height,Sec-CH-Viewport-Width,Sec-CH-Width,Viewport-Height,Viewport-Width,Width',
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
