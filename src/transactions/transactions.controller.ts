import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AuthUser } from '../auth/user.decorator';
import { PageOptionsDto } from '../util/page.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiBearerAuth()
@ApiTags('transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('many')
  createMany(
    @Body() createTransactionDtos: CreateTransactionDto[],
    @AuthUser() user: any,
  ) {
    return this.transactionsService.createMany(
      createTransactionDtos,
      user.userId,
    );
  }

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @AuthUser() user: any,
  ) {
    return this.transactionsService.create({
      ...createTransactionDto,
      user: user.userId,
    });
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto, @AuthUser() user: any) {
    return this.transactionsService.findAll(pageOptionsDto, user.userId);
  }

  @Get('month-sum')
  getMonthlySum(@AuthUser() user: any) {
    return this.transactionsService.getMonthlyCategorySums(user.userId);
  }

  @Get('month-category')
  getMonthlyCategory(@AuthUser() user: any) {
    return this.transactionsService.getMonthlyCategory(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
