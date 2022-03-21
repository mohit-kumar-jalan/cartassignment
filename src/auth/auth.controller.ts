import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './auth.service';
import { loginDto } from './user.login.dto';
import { logoutDTO } from './user.logout.dto';
import { SignupDTO } from './user.signup.dto';

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
  async logout(@Body() request: logoutDTO) {
    return await this.userService.logout(request);
  }
}
