import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Screen } from "src/entities/screen.entity";
import { ScreenService } from "./screen.service";
import { ScreenController } from "./screen.controller";
import { User } from "src/entities/user.entity";
import { EmailModule } from "../email/email.module";
import { PlayListCompany } from "src/entities/playListCompany.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Screen, User, PlayListCompany]), EmailModule],
  controllers: [ScreenController],
  providers: [ScreenService],
  exports: [ScreenService],
})
export class ScreenModule {}
