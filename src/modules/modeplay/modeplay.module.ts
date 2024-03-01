import { Module } from "@nestjs/common";
import { ModeplayService } from "./modeplay.service";
import { ModeplayController } from "./modeplay.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModePlay } from "src/entities/modePlay.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ModePlay])],
  controllers: [ModeplayController],
  providers: [ModeplayService],
  exports: [ModeplayService],
})
export class ModeplayModule {}
