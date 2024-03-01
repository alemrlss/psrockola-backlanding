import { Module } from "@nestjs/common";
import { CryptoService } from "./crypto.service";

@Module({
  controllers: [],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
