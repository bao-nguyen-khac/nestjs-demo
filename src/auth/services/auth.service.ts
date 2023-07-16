import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly userService: UserService) {}
  async checkLogin(username: string, password: string) {
    const user = await this.userService.findForLogin(username, password);
    return user;
  }
}
