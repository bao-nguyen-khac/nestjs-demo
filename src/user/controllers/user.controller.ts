import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, SerializeUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    return new SerializeUserDto(await this.userService.create(createUserDto));
  }
}
