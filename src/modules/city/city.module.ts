import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "src/entities/city.entity";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";
import { StateModule } from "../state/state.module";

@Module({
  imports: [TypeOrmModule.forFeature([City]), StateModule],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService, TypeOrmModule],
})
export class CityModule {}
