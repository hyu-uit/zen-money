import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FundsService } from './funds.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Post()
  create(@Body() dto: CreateFundDto) {
    return this.fundsService.create(dto);
  }

  @Get()
  findAll(@Query('accountId') accountId?: string) {
    return this.fundsService.findAll(accountId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFundDto) {
    return this.fundsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fundsService.remove(id);
  }
}
