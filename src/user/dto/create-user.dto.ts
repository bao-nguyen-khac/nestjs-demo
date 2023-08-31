import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  // @IsEmail()
  email: string;
}

export class SerializeUserDto {
  @Exclude()
  id: string;

  username: string;

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;

  email: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
