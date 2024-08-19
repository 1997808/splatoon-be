import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { AuthUser } from '../auth/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { PageOptionsDto } from '../util/page.dto';

@ApiBearerAuth()
@ApiTags('bills')
@Controller('bills')
@UseGuards(JwtAuthGuard)
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  create(@Body() createBillDto: CreateBillDto, @AuthUser() user: any) {
    return this.billsService.create({
      ...createBillDto,
      user: user.userId,
    });
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto, @AuthUser() user: any) {
    return this.billsService.findAll(pageOptionsDto, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsService.remove(+id);
  }
}
