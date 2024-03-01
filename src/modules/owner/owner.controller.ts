import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { OwnerService } from "./owner.service";
import { create } from "domain";
import { CreateOwnerDto } from "./dto/create-owner.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("owner")
@UseGuards(AuthGuard)
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    return await this.ownerService.create(createOwnerDto);
  }

  @Get()
  async getById() {
    return await this.ownerService.getById();
  }
}
