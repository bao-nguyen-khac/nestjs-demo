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
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
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
