import { Module } from "@nestjs/common";
import { QuotationPlayService } from "./quotation_play.service";
import { QuotationPlayController } from "./quotation_play.controller";
import { User } from "src/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { YoutubeModule } from "../youtube/youtube.module";
import { ModeplayModule } from "../modeplay/modeplay.module";
import { ScreenModule } from "../screen/screen.module";
import { PlayListCompanyModule } from "../play_list_company/play_list_company.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    YoutubeModule,
    ModeplayModule,
    ScreenModule,
    PlayListCompanyModule
  ],
  controllers: [QuotationPlayController],
  providers: [QuotationPlayService],
  exports: [QuotationPlayService],
})
export class QuotationPlayModule {}
