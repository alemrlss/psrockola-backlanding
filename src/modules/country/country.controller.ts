import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(
    @Query("take") take?: number,
    @Query("skip") skip?: number,
    @Query("name") name?: string
  ) {
    return this.countryService.findAll(take, skip, name);
  }
  @Get("/selects")
  findAllSelects() {
    return this.countryService.findAllSelects();
  }
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.countryService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: number, @Body() body: CreateCountryDto) {
    return this.countryService.update(id, body);
  }

  @Post()
  create(@Body() body: CreateCountryDto) {
    return this.countryService.create(body);
  }

  @Put(":id")
  toggleActive(@Param("id") id: number) {
    return this.countryService.toggleActive(id);
  }
}
