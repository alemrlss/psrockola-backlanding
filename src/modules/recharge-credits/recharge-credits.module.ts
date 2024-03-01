import { Module } from '@nestjs/common';
import { RechargeCreditsService } from './recharge-credits.service';
import { RechargeCreditsController } from './recharge-credits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [ TypeOrmModule.forFeature([User]), TransactionsModule],
  controllers: [RechargeCreditsController],
  providers: [RechargeCreditsService],
})
export class RechargeCreditsModule {}
