import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAccountDto) {
    return this.prisma.physicalAccount.create({
      data: dto,
    });
  }

  findAll(userId: string) {
    return this.prisma.physicalAccount.findMany({ where: { userId } });
  }

  findOne(id: string) {
    return this.prisma.physicalAccount.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateAccountDto) {
    return this.prisma.physicalAccount.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.physicalAccount.delete({
      where: { id },
    });
  }
}
