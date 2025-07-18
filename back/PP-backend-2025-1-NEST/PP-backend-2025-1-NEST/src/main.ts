import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Env } from "./env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  app.enableCors({
    origin: 'http://localhost:3000', // <-- Permita o acesso do seu frontend Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Tipos de requisição que seu frontend pode fazer
    credentials: true, // Se você usa cookies ou headers de autorização/autenticação
  });
  const configService: ConfigService<Env, true> = app.get(ConfigService);

  const port = configService.get("PORT", { infer: true });

  await app.listen(port);
}

bootstrap();