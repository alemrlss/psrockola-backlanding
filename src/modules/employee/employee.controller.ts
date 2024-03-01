import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/Create-employee.dto";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("employee")
@UseGuards(AuthGuard)

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get("employees/:id")
  async getEmployeesByIdCompany(@Param("id") id: number) {
    const employees = await this.employeeService.getEmployeesByIdCompany(id);
    return { message: "ok", data: employees };
  }

  @Post("create")
  async create(@Body() data: CreateEmployeeDto) {
    const employee = await this.employeeService.create(data);
    return { message: "ok", data: employee };
  }
}
