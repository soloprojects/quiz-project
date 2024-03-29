import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from '../config/app.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      email: user.email,
      role: payload.role,
      tenant: 'Solomon',
    };
  }
}
