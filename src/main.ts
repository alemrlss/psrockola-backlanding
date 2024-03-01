import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as morgan from "morgan";
import { CORS } from "./constants";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { json } from "body-parser";

import { Request } from "express";
import rawBodyMiddleware from "./middlewares/rawBody.middleware";

interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ["debug"] });
  // Middleware para manejar el raw body

  app.setGlobalPrefix("api");
  app.use(rawBodyMiddleware());
  app.use(morgan("dev"));
  app.enableCors(CORS);
  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get("PORT"));
  console.log("Running on port: ", configService.get("PORT"));
}

bootstrap();
