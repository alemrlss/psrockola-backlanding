import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { ConfirmPayUserService } from "./confirm_pay_user.service";
import { ConfirmPayUserDto } from "./dto/confirm_pay_user.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("confirm-pay-user")
@UseGuards(AuthGuard)

export class ConfirmPayUserController {
  constructor(private readonly confirmPayUserService: ConfirmPayUserService) {}

  @Post()
  create(@Body() confirmPayUserDto: ConfirmPayUserDto) {
    return this.confirmPayUserService.create(confirmPayUserDto);
  }
}
