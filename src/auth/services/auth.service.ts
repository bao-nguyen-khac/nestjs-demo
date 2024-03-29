import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { genAccessToken, genRefreshToken } from '../../ultis/jwt';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async checkLogin(username: string, password: string) {
    const user = await this.userService.findForLogin(username, password);
    console.log('🚀 ~ file: auth.service.ts:15 ~ checkLogin ~ user:', user);
    if (user) {
      const refreshToken = await genRefreshToken(
        {
          id: user.id,
          username: user.username,
        },
        this.jwtService,
      );
      user.refreshToken = refreshToken;
      await this.userService.create(user);
      const accessToken = await genAccessToken(
        {
          id: user.id,
          username: user.username,
        },
        this.jwtService,
      );
      return {
        refreshToken,
        accessToken,
      };
    }
    return null;
  }

  async refreshToken(payload: any) {
    const user = await this.userService.findById(payload.userId);
    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');
    if (user.refreshToken !== payload.refreshToken) throw new ForbiddenException('Access Denied');
    const newAccessToken = await genAccessToken(
      {
        id: payload.userId,
        username: payload.username,
      },
      this.jwtService,
    );
    return { accessToken: newAccessToken };
  }

  async register(createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  async loginViaGoogleAuth(payload: Profile) {
    const user = await this.userService.findByEmail(payload.emails[0].value);
    console.log('🚀 ~ file: auth.service.ts:64 ~ loginViaGoogleAuth ~ user:', user);
    if (!user) {
      const createUserDto: any = {
        email: payload.emails[0].value,
        username: payload.emails[0].value,
        password: payload.id,
      };
      const user = await this.userService.createViaGg(createUserDto);
      const refreshToken = await genRefreshToken(
        {
          id: user.id,
          username: user.username,
        },
        this.jwtService,
      );
      user.refreshToken = refreshToken;
      await this.userService.createViaGg(user);
      const accessToken = await genAccessToken(
        {
          id: user.id,
          username: user.username,
        },
        this.jwtService,
      );
      return {
        accessToken,
        refreshToken,
      };
    } else {
      const refreshToken = await genRefreshToken(
        {
          id: user.id,
          username: user.username,
        },
        this.jwtService,
      );
      user.refreshToken = refreshToken;
      await this.userService.create(user);
      const accessToken = await genAccessToken(
        {
          id: user.id,
          username: user.username,
        },
        this.jwtService,
      );
      return {
        refreshToken,
        accessToken,
      };
    }
  }
}
