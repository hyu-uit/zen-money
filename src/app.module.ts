import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import { FundsModule } from './funds/funds.module';
import { FiscalCyclesModule } from './fiscal-cycles/fiscal-cycles.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [PrismaModule, AccountsModule, UsersModule, FundsModule, FiscalCyclesModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
