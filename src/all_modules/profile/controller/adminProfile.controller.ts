import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Put,
  Delete,
  Param,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { CreateUserDto } from '../schema/dto/create-user.dto';
import { AdminProfileService } from '../services/admin-profile.service';
import { UpdateUserDto } from '../schema/dto/update-user.dto';
import { UpdateStatusDto } from '../schema/dto/update-status.dto';
import {
  AuthUser,
  UpdatedUserResponse,
} from 'src/all_modules/authentication/schema/entity/login.entity';
import { ApiTags } from '@nestjs/swagger';
import {  UserResponse } from '../schema/entity/profile.entity';

@ApiTags('admin')
// @UseGuards(JwtAuthGuard)
@Controller('')
export default class AdminProfileController {
  constructor(private adminProfileService: AdminProfileService) {}

  @Post('')
  async register(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<AuthUser> {
    return this.adminProfileService.register(createUserDto);
  }

  @Get('')
  getProfile(): Promise<UserResponse[]> {
    return this.adminProfileService.getAllUsers();
  }

  @Get('/:id')
  getUserProfile(@Param('id') userId: string): Promise<AuthUser> {
    return this.adminProfileService.getSingleUser(userId);
  }

  @Put(':id')
  editUserProfile(
    @Param('id') userId: string,
    @Body() updateData: UpdateUserDto,
  ): Promise<UpdatedUserResponse> {
    return this.adminProfileService.updateUserProfile(userId, updateData);
  }

  @Put('updateStatus/:id')
  editStatus(
    @Param('id') id: string,
    @Body() updateStatus: UpdateStatusDto,
  ): Promise<UpdatedUserResponse> {
    return this.adminProfileService.updateUserStatus(id, updateStatus);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string): Promise<UpdatedUserResponse> {
    return this.adminProfileService.deleteUser(userId).catch(err =>{
      throw new HttpException(err.message,err.statusCode??400)
    });
  }
}
