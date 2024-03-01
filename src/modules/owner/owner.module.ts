import { Module } from "@nestjs/common";
import { OwnerController } from "./owner.controller";
import { OwnerService } from "./owner.service";
import { Owner } from "src/entities/owner.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { User } from "src/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
