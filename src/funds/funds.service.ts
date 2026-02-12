import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FundsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFundDto) {
    return this.prisma.fund.create({ data: dto });
  }

  findAll(accountId?: string) {
    return this.prisma.fund.findMany({
      where: accountId ? { defaultAccountId: accountId } : {},
    });
  }

  findOne(id: string) {
    return this.prisma.fund.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateFundDto) {
    return this.prisma.fund.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.fund.delete({ where: { id } });
  }
}
