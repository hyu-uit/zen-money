import { Module } from '@nestjs/common';
import { FiscalCyclesService } from './fiscal-cycles.service';
import { FiscalCyclesController } from './fiscal-cycles.controller';

@Module({
  controllers: [FiscalCyclesController],
  providers: [FiscalCyclesService],
  exports: [FiscalCyclesService],
})
export class FiscalCyclesModule {}
