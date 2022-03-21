import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { loginDto } from './user.login.dto';
import { SignupDTO } from './user.signup.dto';
import { request } from 'http';
import { logoutDTO } from './user.logout.dto';
import { parse, stringify } from 'flatted';
import jwtr from 'redis';
import { TokenEntity } from './token.entity';

let a = [];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,

    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async signup(data: SignupDTO) {
    const user = this.userRepository.create(data);
    await this.userRepository.save(data);
    return user;
  }

  async login(data: loginDto) {
    const response = await this.userRepository.find({
      where: { email: data.email, password: data.password },
    });

    const accessToken = this.jwtService.sign({ user: data.email });
    if (response.length) {
      return { success: true, message: 'Login success', accessToken };
    } else {
      return {
        success: false,
        message: 'user does not found',
      };
    }
  }

  async logout(request: logoutDTO) {
    try {
      this.jwtService.verify(request.accessToken);
      const token = request.accessToken;
      if (a.includes(token)) {
        return {
          success: false,
          message: 'altready',
        };
      } else {
        a.push(token);
        return {
          success: true,
          message: 'success',
        };
      }
    } catch (error) {
      const e = parse(stringify(error));
      if (e.name === 'TokenExpiredError') {
        return {
          message: 'Token expired',
        };
      } else {
        return {
          message: 'error in logout',
        };
      }
    }
  }
}
