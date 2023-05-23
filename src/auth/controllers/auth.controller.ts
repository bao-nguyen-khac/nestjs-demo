import {
  Controller,
  Post,
  UseGuards,
  Request,
  Inject,
  Get,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/user/filters/http-exeption.filter';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
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
  @UseFilters(HttpExceptionFilter)
  privateSite(@Request() req) {
    console.log(req.user);
    throw new HttpException('Login suscessful', 200);
  }
}
