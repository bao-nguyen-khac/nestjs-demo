import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: '435440340138-tdrtdehhrfs0sknuhpph9v75s3skfe7i.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    console.log('🚀 ~ file: googole.strategy.ts:17 ~ validate ~ profile:', profile);
    console.log('🚀 ~ file: googole.strategy.ts:17 ~ validate ~ refreshToken:', refreshToken);
    console.log('🚀 ~ file: googole.strategy.ts:17 ~ validate ~ accessToken:', accessToken);
    done(null, profile);
  }
}
