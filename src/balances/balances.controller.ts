import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AuthUser } from '../auth/user.decorator';

@ApiBearerAuth()
@ApiTags('balances')
@Controller('balances')
@UseGuards(JwtAuthGuard)
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Post()
  create(@Body() createBalanceDto: CreateBalanceDto, @AuthUser() user: any) {
    return this.balancesService.create({
      ...createBalanceDto,
      user: user.userId,
    });
  }

  @Get()
  findAll() {
    return this.balancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balancesService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceDto: UpdateBalanceDto) {
    return this.balancesService.update(+id, updateBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.balancesService.remove(+id);
  }
}
