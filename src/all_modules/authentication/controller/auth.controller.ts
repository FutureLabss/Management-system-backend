import { Controller, Post, UseGuards, Request, Body, HttpException, Req, Put } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../schema/dto/login.dto';
import { UserAuthGuard } from 'src/core/guard/user.guard';
import { ForgotPasswordDto, passwordDTO } from '../schema/dto/password.dto';
import { UpdatedUserResponse } from '../schema/entity/login.entity';

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

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken).catch((err) =>{
      throw new HttpException(err.message,err.statusCode??400)
    })
  }

  @Put('')
  @UseGuards(UserAuthGuard)
  async resetPassword( @Body() DTO: passwordDTO,@Request() req):Promise<UpdatedUserResponse>{
    const userId = req.user.id;
   return this.authService.passwordReset(userId, DTO).catch((err) =>{
    throw new HttpException(err.message,err.statusCode??400)
  })
  }

  @Put('/forgotPassword')
  // @UseGuards(UserAuthGuard)
  async forgotPassword( @Body() DTO: ForgotPasswordDto){
    return this.authService.forgotPassword(DTO)
  }

}
