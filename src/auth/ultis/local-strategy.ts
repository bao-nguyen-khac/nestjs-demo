import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
    super({
      // usernameField: 'email',
    });
  }

  async validate(username: string, password: string) {
    return {
      username,
      password,
    };
  }
}
