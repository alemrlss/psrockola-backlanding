import { Module } from "@nestjs/common";
import { StateService } from "./state.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { State } from "src/entities/state.entity";
import { StateController } from "./state.controller";
import { CountryModule } from "src/modules/country/country.module";

@Module({
  imports: [TypeOrmModule.forFeature([State]), CountryModule],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService, TypeOrmModule],
})
export class StateModule {}
