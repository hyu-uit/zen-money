import { PartialType } from '@nestjs/mapped-types';
import { CreateFiscalCycleDto } from './create-fiscal-cycle.dto';

export class UpdateFiscalCycleDto extends PartialType(CreateFiscalCycleDto) {}
