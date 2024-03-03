import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceConfig } from "./config/data.source";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { APP_FILTER } from "@nestjs/core";
import { DuplicateKeyFilter } from "./utils/DuplicateKeyFilters.util";
import { YoutubeModule } from "./modules/youtube/youtube.module";
import { ModeplayModule } from "./modules/modeplay/modeplay.module";
import { QuotationPlayModule } from "./modules/quotation_play/quotation_play.module";
import { ConfirmPayUserModule } from "./modules/confirm_pay_user/confirm_pay_user.module";
import { PlayListCompanyModule } from "./modules/play_list_company/play_list_company.module";
import { RechargeCreditsModule } from "./modules/recharge-credits/recharge-credits.module";
import { TransactionsModule } from "./modules/transactions/transactions.module";
import { CryptoModule } from "./modules/crypto/crypto.module";
import { OwnerModule } from "./modules/owner/owner.module";
import { WalletModule } from "./modules/wallet/wallet.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { CountryModule } from "./modules/country/country.module";
import { StateModule } from "./modules/state/state.module";
import { CityModule } from "./modules/city/city.module";
import { StripeModule } from "./modules/stripe/stripe.module";
import { MembershipModule } from "./modules/membership/membership.module";
import { EmployeeModule } from "./modules/employee/employee.module";
import { ScreenModule } from "./modules/screen/screen.module";
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UserModule,
    AuthModule,
    YoutubeModule,
    ModeplayModule,
    QuotationPlayModule,
    ConfirmPayUserModule,
    PlayListCompanyModule,
    RechargeCreditsModule,
    TransactionsModule,
    CryptoModule,
    OwnerModule,
    WalletModule,
    DashboardModule,
    CountryModule,
    StateModule,
    CityModule,
    StripeModule,
    MembershipModule,
    EmployeeModule,
    ScreenModule,
    SeedModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyFilter,
    },
  ],
})
export class AppModule {
  static port: number | string;
}
