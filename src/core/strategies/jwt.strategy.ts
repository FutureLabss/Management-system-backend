import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthResponse } from 'src/all_modules/authentication/schema/entity/login.entity';
import jwtConstants from '../config/constants';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AuthResponse) {
    return {
      id: payload.id,
      name: payload.fullName,
      email: payload.email,
    };
  }
}
