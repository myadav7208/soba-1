import {
  Injectable,
  Request,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { userService } from 'src/user/user.service';

interface userData {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
}

interface login {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private user: userService, private jwt: JwtService) {}

  async create(user: userData) {
    const newUser = await this.user.createUser(user);
    const payload = {
      id: newUser.id,
      username: newUser.username,
    };

    return {
      token: await this.generateToken(payload),
    };
  }

  async login(loginData: login) {
    const { username, password } = loginData;
    const isUser = await this.user.findUser(username);
    if (!isUser) {
      throw new NotFoundException('user not found');
    }
    const isValidPassword = password == isUser.password;
    if (!isValidPassword) {
      throw new HttpException('user or password not matched', 404);
    }

    return {
      token: await this.generateToken({
        id: isUser.id,
        username: isUser.username,
      }),
    };
  }

  async generateToken(payload) {
    const token = await this.jwt.sign(payload);
    return token;
  }
}
