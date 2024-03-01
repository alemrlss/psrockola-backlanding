import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RechargeCreditsService } from './recharge-credits.service';
import { RechargeCreditDto } from './dto/create-recharge-credit.dto';
import { AuthGuard } from '../auth/jwt.strategy';

@Controller('recharge-credits')
@UseGuards(AuthGuard)


export class RechargeCreditsController {
  constructor(
    private readonly rechargeCreditsService: RechargeCreditsService
  ) {}

  @Post()
  create(@Body() createRechargeCreditDto: RechargeCreditDto) {
    return this.rechargeCreditsService.recharge(createRechargeCreditDto);
  }
}
