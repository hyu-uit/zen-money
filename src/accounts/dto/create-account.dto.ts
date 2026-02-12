import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { AccountType } from '@prisma/client';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
