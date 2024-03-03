import { Controller, Get, Param } from "@nestjs/common";
import { SeedService } from "./seed.service";

@Controller("seed")
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get("/run/:countryName")
  async seedCountryData(@Param("countryName") countryName: string) {
    await this.seedService.seedCountryData(countryName);
  }
}
