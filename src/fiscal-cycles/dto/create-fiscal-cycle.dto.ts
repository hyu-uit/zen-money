import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFiscalCycleDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsNumber()
  @IsNotEmpty()
  salaryAmount: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
