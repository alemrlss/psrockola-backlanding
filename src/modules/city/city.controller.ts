import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CityService } from "./city.service";
import { CreateCityDto } from "./dto/Create-city.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("city")
export class CityController {
  constructor(private readonly CityService: CityService) {}

  @Get(":stateId")
  findAllByStateId(
    @Param("stateId") stateId: number,
    @Query("take") take?: number,
    @Query("skip") skip?: number,
    @Query("name") name?: string
  ) {
    return this.CityService.findAllByStateId(stateId, take, skip, name);
  }

  @Get(":stateId/selects")
  findAllSelects(@Param("stateId") stateId: number) {
    return this.CityService.findAllSelects(stateId);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateCityDto) {
    const { name, stateId } = body;
    return this.CityService.create(name, stateId);
  }
}
