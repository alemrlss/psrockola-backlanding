import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { FindManyOptions } from "typeorm";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("wallet")
@UseGuards(AuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(":walletId/amount")
  async getDecryptedAmount(@Param("walletId") walletId: FindManyOptions) {
    const decryptedAmount =
      await this.walletService.getDecryptedAmount(walletId);
    return { message: "ok", data: { decryptedAmount } };
  }
}
