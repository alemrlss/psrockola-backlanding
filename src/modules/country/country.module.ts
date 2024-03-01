import { Module } from "@nestjs/common";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "src/entities/country.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService, TypeOrmModule],
})
export class CountryModule {}
