import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { SerializeUserDto } from '../dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers: UserEntity[] = [
        { id: 1, username: 'John', password: '', email: '' },
        { id: 2, username: 'John', password: '', email: '' },
      ];
      const expectedDto = mockUsers.map((user) => new SerializeUserDto(user));
      jest.spyOn(service, 'getAll').mockResolvedValue(expectedDto);

      const result = await controller.getAll();
      console.log('🚀 ~ file: user.controller.spec.ts:31 ~ result:', result);

      expect(result).toEqual(mockUsers);
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return user by id', async () => {
      const mockUsers: SerializeUserDto = {
        id: '1',
        password: 'password',
        username: 'John',
        email: '',
      };
      //   const expectedDto = mockUsers.map((user) => new SerializeUserDto(user));
      jest.spyOn(service, 'findById').mockResolvedValue(mockUsers);

      const result = await controller.findById(1);
      console.log('🚀 ~ file: user.controller.spec.ts:31 ~ result:', result);

      expect(result).toEqual(mockUsers);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });
  });
});
