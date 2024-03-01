import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ScreenService } from "./screen.service";
import { CreateScreenDto } from "./dto/create-screen.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { EditScreenDto } from "./dto/edit-screen.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("screen")
@UseGuards(AuthGuard)
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @Get()
  async getScreens() {
    const screens = await this.screenService.findAll();
    return { message: "ok", data: screens };
  }

  @Get("company/:companyId")
  async getScreensByCompany(@Param("companyId") companyId: number) {
    const screens = await this.screenService.getAllScreensByCompany(companyId);
    return { message: "ok", data: screens };
  }

  @Get(":id")
  async getScreenById(@Param("id") id: number) {
    const screen = await this.screenService.getScreenById(id);
    return { message: "ok", data: screen };
  }

  @Post()
  async createScreen(@Body() createScreenDto: CreateScreenDto) {
    try {
      const screen = await this.screenService.createScreen(createScreenDto);
      return { message: "ok", data: screen };
    } catch (error) {
      console.log(error);
      return { message: "error", data: error.message };
    }
  }

  @Patch(":id")
  async editScreen(
    @Param("id") screenId: number,
    @Body() editScreenDto: EditScreenDto
  ) {
    try {
      const updatedScreen = await this.screenService.editScreen(
        screenId,
        editScreenDto
      );
      return { message: "ok", data: updatedScreen };
    } catch (error) {
      return { error: "No se pudo editar la pantalla", details: error.message };
    }
  }

  @Patch("toggle/:id")
  async toggleScreen(@Param("id") id: number, @Body() { userId }) {
    const screen = await this.screenService.toggleScreen(id, userId);
    return { message: "ok", data: screen };
  }
}
