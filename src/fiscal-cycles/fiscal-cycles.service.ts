import { Injectable } from '@nestjs/common';
import { CreateFiscalCycleDto } from './dto/create-fiscal-cycle.dto';
import { UpdateFiscalCycleDto } from './dto/update-fiscal-cycle.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FiscalCyclesService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateFiscalCycleDto) {
    return this.prisma.fiscalCycle.create({ data: dto });
  }

  findAll(userId: string) {
    return this.prisma.fiscalCycle.findMany({ where: { userId } });
  }

  findOne(id: string) {
    return this.prisma.fiscalCycle.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateFiscalCycleDto) {
    return this.prisma.fiscalCycle.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.fiscalCycle.delete({ where: { id } });
  }

  findCurrent(userId: string) {
    const now = new Date();
    return this.prisma.fiscalCycle.findFirst({
      where: {
        userId,
        startDate: { lte: now },
        endDate: { gte: now },
      },
    });
  }
}
