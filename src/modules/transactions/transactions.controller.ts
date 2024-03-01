import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { AuthGuard } from "../auth/jwt.strategy";


@Controller("transactions")
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(":idUser")
  findAllById(@Param("idUser") idUser: number) {
    return this.transactionsService.findAllById(idUser);
  }
}
