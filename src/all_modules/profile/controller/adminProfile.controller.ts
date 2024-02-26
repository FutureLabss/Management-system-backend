import { Controller, Get, UseGuards, Request, Post, Body, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { CreateUserDto } from '../schema/dto/create-user.dto';
import { AuthResponse, AuthUser } from 'src/all_modules/authentication/schema/entity/login.entity';
import { AdminProfileService } from '../services/admin-profile.service';
import { UpdateUserDto } from '../schema/dto/update-user.dto';

@Controller('')
export default class AdminProfileController {
  constructor(private adminProfileService: AdminProfileService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  async register(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<AuthUser> {
    return this.adminProfileService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('allUsers')
  getProfile(@Request() req):Promise<AuthUser[]> {
    return this.adminProfileService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/:id')
  editUserProfile(@Request() req,
   @Body() updateData:UpdateUserDto 
  ):Promise<AuthUser>{
    const user = req.user;
    return this.adminProfileService.updateUserProfile(user.id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteUser(@Request() req): Promise<AuthUser> {
    const userId = req.params.id.
    id;
    return this.adminProfileService.deleteUser(userId);
  }
  }

  

