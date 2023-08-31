import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, encodePassword } from '../../ultis/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, SerializeUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    console.log('🚀 ~ file: user.service.ts:17 ~ password:', password);
    const user = await this.userRepository.save({ ...createUserDto, password });
    return new SerializeUserDto(user);
  }

  async getAll() {
    const users = await this.userRepository.find();
    return users.map((user) => new SerializeUserDto(user));
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (user) return new SerializeUserDto(user);
    else return user;
  }

  async findForLogin(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (user) {
      const match = comparePassword(password, user.password);
      if (match) return user;
      else return null;
    }
    return user;
  }
}
