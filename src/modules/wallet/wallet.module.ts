import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "src/entities/wallet.entity";
import { User } from "src/entities/user.entity";
import { CryptoModule } from "../crypto/crypto.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    TypeOrmModule.forFeature([User]),
    CryptoModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
