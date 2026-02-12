import {
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  transactionDate: string;

  @IsOptional()
  @IsString()
  fundId?: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsOptional()
  @IsString()
  toAccountId?: string;

  @IsString()
  @IsNotEmpty()
  fiscalCycleId: string;
}
