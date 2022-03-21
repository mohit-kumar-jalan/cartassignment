import { Body, Controller, Get, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { UserService } from './auth.service';
import { loginDto } from './user.login.dto';
import { logoutDTO } from './user.logout.dto';
import { SignupDTO } from './user.signup.dto';
import { parse, stringify } from 'flatted';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('signup')
    async create(@Body() data: SignupDTO){
        return{
            statusCode: HttpStatus.OK,
            message: 'User added successfully',
            data: await this.userService.signup(data),
        }
    }

    @Post('login')
    async login(@Body() data: loginDto){
        return this.userService.login(data);
    }

    @Post('logout')
  async logout(@Request() req) {
    //const err = parse(stringify(req));
    const token=req.headers['authorization'].split(' ')[1]
    return await this.userService.logout(token);
  }
}
