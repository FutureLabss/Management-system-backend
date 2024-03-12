import { Controller, Post, UseGuards, Request, Body, HttpException, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../schema/dto/login.dto';
import { UserAuthGuard } from 'src/core/guard/user.guard';

@ApiTags("auth")
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() DTO: LoginDto,@Request() req) {
    return this.authService.login(DTO).catch((err) =>{
      throw new HttpException(err.message,err.statusCode??400)
    })
  }
  @Post('logout')
  @UseGuards(UserAuthGuard)
  async logout(@Request() req) {
    console.log('reguest');
    // const token = req..get('jwt'); 
    // await this.authService.logout(token);
  
  }
}
