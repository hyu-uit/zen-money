import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionType } from '@prisma/client';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(TransactionType)
  @IsOptional()
  type: TransactionType;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  transactionDate: string;

  @IsString()
  @IsOptional()
  fundId: string;

  @IsString()
  @IsOptional()
  accountId: string;
}
