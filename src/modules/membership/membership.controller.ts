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
import { create } from "domain";
import { MembershipService } from "./membership.service";
import { CreateMembershipDto } from "./dto/create-membership.dto";
import { UserService } from "../user/user.service";
import { AuthGuard } from "../auth/jwt.strategy";

@Controller("membership")
@UseGuards(AuthGuard)
export class MembershipController {
  constructor(
    private readonly membershipService: MembershipService,
    private readonly userService: UserService
  ) {}

  @Post("create")
  async createMembership(@Body() body: CreateMembershipDto) {
    const membership = await this.membershipService.createMembership(body);
    return { message: "ok", data: membership };
  }

  @Patch("update")
  async updateMembership(@Body() body: any) {
    const membership = await this.membershipService.updateMembership(body);
    return { message: "ok", data: membership };
  }

  @Get("/:idCountry")
  async getMembershipByCountry(@Param("idCountry") idCountry: number) {
    try {
      const memberships =
        await this.membershipService.getMembershipByCountry(idCountry);
      return memberships;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get("get-membership/:idMembership")
  async getMembershipById(@Param("idMembership") idMembership: number) {
    try {
      const membership =
        await this.membershipService.getMembershipById(idMembership);
      return membership;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post("cancel-subscription/:idUser")
  async cancelSubscription(@Param("idUser") idUser: number) {
    const canceled = await this.userService.desactivateMembership(idUser);
    return { message: "ok", data: canceled };
  }
}
