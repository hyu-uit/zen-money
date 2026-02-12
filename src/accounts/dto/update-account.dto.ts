import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AccountType } from 'generated/prisma/enums';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(AccountType)
  @IsOptional()
  type: AccountType;
}
