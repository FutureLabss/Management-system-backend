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

@ApiTags('admin')
@UseGuards(JwtAuthGuard)
@Controller('')
export default class AdminProfileController {
  constructor(private adminProfileService: AdminProfileService) {}

  @Post('register')
  async register(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<AuthUser> {
    return this.adminProfileService.register(createUserDto);
  }

  @Get('getAllUsers')
  getProfile(@Request() req): Promise<AuthUser[]> {
    return this.adminProfileService.getAllUsers();
  }

  @Get('getUser/:id')
  getUserProfile(@Param('id') userId: string): Promise<AuthUser> {
    return this.adminProfileService.getUserProfile(userId);
  }

  @Put('updateUser/:id')
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

  @Delete('deleteUser/:id')
  deleteUser(@Param('id') userId: string): Promise<AuthUser> {
    return this.adminProfileService.deleteUser(userId);
  }
}
