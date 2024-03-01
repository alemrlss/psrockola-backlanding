import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { StateService } from "./state.service";
import { CreateStateDto } from "./dto/Create-state.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("state")
export class StateController {
  constructor(private readonly StateService: StateService) {}

  @Get(":countryId")
  findAllByCountryId(
    @Param("countryId") countryId: number,
    @Query("take") take?: number,
    @Query("skip") skip?: number,
    @Query("name") name?: string
  ) {
    return this.StateService.findAll(countryId, take, skip, name);
  }

  @Get(":countryId/selects")
  findAllSelects(@Param("countryId") countryId: number) {
    return this.StateService.findAllSelects(countryId);
  }
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateStateDto) {
    const { name, countryId } = body;
    return this.StateService.create(name, countryId);
  }
  @Patch(":id")
  update(@Param("id") id: number, @Body() body: any) {
    return this.StateService.update(id, body);
  }

  @Put(":id")
  toggleActive(@Param("id") id: number) {
    return this.StateService.toggleActive(id);
  }
}
