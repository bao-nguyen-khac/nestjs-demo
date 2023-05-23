import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const user = await this.userRepository.save(createUserDto);
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
}
