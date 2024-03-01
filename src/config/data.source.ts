import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

ConfigModule.forRoot({
  envFilePath: `.env`,
});

const configService = new ConfigService();

// LOCAL CONFIG

//export const DataSourceConfig: DataSourceOptions = {
 // type: "postgres",
  //host: "localhost",
  //port: 5432,
  //username: "postgres",
  //password: "Ale31110364",
  //database: "rockola",
  //entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  //synchronize: true,
//};

//RENDER CONFIG

export const DataSourceConfig: DataSourceOptions = {
type: "postgres",
url: configService.get("DB_URL"),
entities: [__dirname + "/../**/*.entity{.ts,.js}"],
synchronize: true,
ssl: { rejectUnauthorized: false },
};

export const AppDS = new DataSource(DataSourceConfig);
