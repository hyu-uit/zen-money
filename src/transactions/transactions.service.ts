import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({ data: dto });

      if (dto.type === TransactionType.EXPENSE) {
        // 2. Trừ Fund balance (nếu có fundId)
        if (dto.fundId) {
          await tx.fund.update({
            where: { id: dto.fundId },
            data: { balance: { decrement: dto.amount } },
          });
        }

        // 3. Trừ Account balance
        await tx.physicalAccount.update({
          where: { id: dto.accountId },
          data: { balance: { decrement: dto.amount } },
        });
      }

      if (dto.type === TransactionType.INCOME) {
        // Cộng Account balance
        await tx.physicalAccount.update({
          where: { id: dto.accountId },
          data: { balance: { increment: dto.amount } },
        });
      }

      if (dto.type === TransactionType.TRANSFER && dto.toAccountId) {
        // Trừ account gửi, cộng account nhận
        await tx.physicalAccount.update({
          where: { id: dto.accountId },
          data: { balance: { decrement: dto.amount } },
        });
        await tx.physicalAccount.update({
          where: { id: dto.toAccountId },
          data: { balance: { increment: dto.amount } },
        });
      }
    });
  }

  findAll(fiscalCycleId?: string, fundId?: string) {
    return this.prisma.transaction.findMany({
      where: {
        ...(fiscalCycleId && { fiscalCycleId }),
        ...(fundId && { fundId }),
      },
      orderBy: { transactionDate: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateTransactionDto) {
    return this.prisma.transaction.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.transaction.delete({ where: { id } });
  }
}
