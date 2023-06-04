import {
  Controller,
  Post,
  UseGuards,
  Request,
  Inject,
  Get,
  UseFilters,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/user/filters/http-exeption.filter';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return {
      token: req.user.access_token,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private')
  privateSite(@Request() req) {
    console.log(req.user);
    console.log(this.configService.get<string>('DATABASE_TYPE'));
    throw new HttpException('Login suscessful', 200);
  }
}
