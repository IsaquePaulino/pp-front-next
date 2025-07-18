// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/env';

export type UserPayload = {
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService<Env, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // O token deve expirar
      
      // ALTERADO: Troque 'secret' por 'secretOrKey'
      secretOrKey: config.get('JWT_SECRET', { infer: true }), // <--- Use JWT_SECRET aqui
    });
  }

  async validate(payload: UserPayload) {
    return { sub: payload.sub };
  }
}