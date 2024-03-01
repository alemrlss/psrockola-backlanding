import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("dashboard")
@UseGuards(AuthGuard)

export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDataDashboard() {
    return await this.dashboardService.getDataDashboard();
  }
}
