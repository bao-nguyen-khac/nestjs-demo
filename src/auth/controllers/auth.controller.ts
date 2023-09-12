import {
  Controller,
  Post,
  UseGuards,
  Request,
  Inject,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { GoogleGuard } from '../guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login/local')
  async login(@Request() req) {
    console.log('🚀 ~ file: auth.controller.ts:34 ~ login ~ req:', req.user);
    const token = await this.authService.checkLogin(req.user.username, req.user.password);
    if (!token) throw new UnauthorizedException();
    return token;
  }

  @UseGuards(GoogleGuard)
  @Get('login/google')
  async loginGoogle() {}

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(@Request() req) {
    const token = await this.authService.loginViaGoogleAuth(req.user);
    return token;
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshToken(@Req() req: any) {
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('user-info')
  privateSite(@Request() req) {
    return req.user;
  }
}
