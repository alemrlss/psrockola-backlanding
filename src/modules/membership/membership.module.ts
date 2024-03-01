import { Module, forwardRef } from "@nestjs/common";
import { MembershipController } from "./membership.controller";
import { MembershipService } from "./membership.service";
import { StripeModule } from "../stripe/stripe.module";
import { Type } from "class-transformer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Membership } from "src/entities/membership.entity";
import { Country } from "src/entities/country.entity";
import { User } from "src/entities/user.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    forwardRef(() => StripeModule),
    UserModule,
    TypeOrmModule.forFeature([Membership, Country, User]),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
