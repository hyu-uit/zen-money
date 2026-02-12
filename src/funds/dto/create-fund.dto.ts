import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFundDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  percentage: number;

  @IsString()
  @IsNotEmpty()
  defaultAccountId: string;
}
