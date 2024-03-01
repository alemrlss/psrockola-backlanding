import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { QuotationPlayService } from "./quotation_play.service";
import { CalculatePriceDto } from "./dto/create-quotation_play.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("quotation-play")
@UseGuards(AuthGuard)
export class QuotationPlayController {
  constructor(private readonly quotationPlayService: QuotationPlayService) {}

  @Post()
  create(@Body() createQuotationPlayDto: CalculatePriceDto) {
    return this.quotationPlayService.calculatePrice(createQuotationPlayDto);
  }
}
