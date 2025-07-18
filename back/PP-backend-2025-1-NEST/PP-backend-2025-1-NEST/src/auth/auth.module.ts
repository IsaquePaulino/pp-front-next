// src/auth/auth.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Env } from "src/env";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    ConfigModule, // Certifique-se que ConfigModule está aqui
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService<Env, true>) => {
        const secret = config.get("JWT_SECRET", { infer: true });

        if (!secret) {
          throw new Error("JWT_SECRET environment variable is not defined.");
        }

        return {
          secret: secret, // Usa a chave secreta
          signOptions: { expiresIn: '1d' }, // HS256 é o padrão, não precisa de "algorithm: 'RS256'"
        };
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}