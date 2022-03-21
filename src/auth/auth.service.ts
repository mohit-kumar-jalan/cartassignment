import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import {  JwtService } from '@nestjs/jwt';
import { loginDto } from './user.login.dto';
import { SignupDTO } from './user.signup.dto';
import { request } from 'http';
import { logoutDTO } from './user.logout.dto';
import { parse, stringify } from 'flatted';
import jwtr from 'redis';
import { TokenEntity } from './token.entity';
import { ExtractJwt } from 'passport-jwt';

let a = [];
let b=[];
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
    const check=Boolean(await this.userRepository.findOne(data.contact))
    //console.log(check)
    if(!check){
    const user = this.userRepository.create(data);
    await this.userRepository.save(data);
    return user;
  }

else{
  return {
    message: "User with this mobile number already exist. Please login"
  }
}
  }

  async login(data: loginDto) {
    const response = await this.userRepository.find({
      where: { email: data.email, password: data.password },
    });

    const accessToken = this.jwtService.sign({ user: data.email });
    if (response.length && b.length===0) {
      b.push(accessToken)
      return { success: true, message: 'Login success', accessToken };
    } else if(b.length!=0 && response.length!=0) {
      return {
        success: false,
        message: 'already logged in, logout first',
      };
    }
    else{
      return{
        success: false,
        message: "User not found"
      }
    }
  }

  async logout(accessToken) {
    /*const s= ExtractJwt.fromAuthHeaderAsBearerToken();
    console.log(s)*/
    try {
      this.jwtService.verify(accessToken);
      const token = accessToken;
      if (a.includes(token)) {
        return {
          success: false,
          message: 'already logged out',
        };
      } else {
        a.push(token);
        b=[]
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
