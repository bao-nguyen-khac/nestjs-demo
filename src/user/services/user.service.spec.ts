// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { UserEntity } from '../entities/user.entity';
// import { Repository } from 'typeorm';
// import * as bcrypt from '../../ultis/bcrypt';

// describe('UserService', () => {
//   let service: UserService;
//   let userRepository: Repository<UserEntity>;

//   const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: USER_REPOSITORY_TOKEN,
//           useValue: {
//             save: jest.fn(),
//             find: jest.fn(),
//             findOne: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<UserService>(UserService);
//     userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('userRepository should be defined', () => {
//     expect(userRepository).toBeDefined();
//   });

//   //   describe('createUser', () => {
//   //     jest.spyOn(bcrypt, 'encodePassword').mockReturnValue('hashed123');
//   //     it('should encode password correctly', async () => {
//   //       await service.create({
//   //         username: 'test',
//   //         password: '123456',
//   //         email: 'kenaa@example.com',
//   //       });
//   //       expect(bcrypt.encodePassword).toHaveBeenCalledWith('123456');
//   //     });

//   //     it('should call userRepository.save with correct params', async () => {
//   //       await service.create({
//   //         username: 'test',
//   //         password: '123456',
//   //         email: 'kenaa@example.com',
//   //       });
//   //       expect(userRepository.save).toHaveBeenCalledWith({
//   //         username: 'test',
//   //         password: 'hashed123',
//   //         email: 'kenaa@example.com',
//   //       });
//   //       expect(userRepository.save);
//   //     });
//   //   });
//   it('should return all users', async () => {
// const mockUsers: UserEntity[] = [
//   { id: 1, username: 'John', password: '', email: '' },
//   { id: 2, username: 'John', password: '', email: '' },
// ];
//     jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);

//     const result = await service.getAll();
//     console.log('🚀 ~ file: user.service.spec.ts:74 ~ result:', result);

//     expect(result).toEqual(mockUsers);
//     expect(userRepository.find).toHaveBeenCalledTimes(1);
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const mockUsers: UserEntity[] = [
        { id: 1, username: 'John', password: '', email: '' },
        { id: 2, username: 'John', password: '', email: '' },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(mockUsers);

      const result = await service.getAll();
      console.log('🚀 ~ file: user.service.spec.ts:117 ~ result:', result);

      expect(result).toEqual(mockUsers);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });
});
