import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './ultis/local-strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from './ultis/accessToken.strategy';
import { RefreshTokenStrategy } from './ultis/refreshToken.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserService,
    },
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
