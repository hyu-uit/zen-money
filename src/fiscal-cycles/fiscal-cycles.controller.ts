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
import { FiscalCyclesService } from './fiscal-cycles.service';
import { CreateFiscalCycleDto } from './dto/create-fiscal-cycle.dto';
import { UpdateFiscalCycleDto } from './dto/update-fiscal-cycle.dto';

@Controller('fiscal-cycles')
export class FiscalCyclesController {
  constructor(private readonly fiscalCyclesService: FiscalCyclesService) {}

  @Post()
  create(@Body() createFiscalCycleDto: CreateFiscalCycleDto) {
    return this.fiscalCyclesService.create(createFiscalCycleDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.fiscalCyclesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fiscalCyclesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFiscalCycleDto: UpdateFiscalCycleDto,
  ) {
    return this.fiscalCyclesService.update(id, updateFiscalCycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fiscalCyclesService.remove(id);
  }
}
