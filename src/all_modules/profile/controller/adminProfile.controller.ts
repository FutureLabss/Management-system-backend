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
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../schema/dto/create-user.dto';
import { AdminProfileService } from '../services/admin-profile.service';
import { UpdateUserDto } from '../schema/dto/update-user.dto';
import { UpdateStatusDto } from '../schema/dto/update-status.dto';
import {
  AuthUser,
  UpdatedUserResponse,
} from 'src/all_modules/authentication/schema/entity/login.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse } from '../schema/entity/profile.entity';
import { AdminAuthGuard } from 'src/core/guard/admin.guard';
import { PaginatedResponse } from 'src/core/entities/response.entities';
import { Filter } from '../schema/interface/profile.interface';

@ApiTags('admin')
@UseGuards(AdminAuthGuard)
@Controller('')
export default class AdminProfileController {
  constructor(private adminProfileService: AdminProfileService) {}

  @Post('')
  async register(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<AuthUser> {
    return this.adminProfileService.register(createUserDto).catch((err) => {
      throw new HttpException(err.message, err.statusCode ?? 400);
    });
  }

  @Get('')
  async getProfile(
    @Query() query: Filter,
  ): Promise<PaginatedResponse<UserResponse>> {
     return this.adminProfileService.getAllUsers(query).catch((err) => {
      throw new HttpException(err.message, err.statusCode ?? 400);
    });
  }

  @Get(':id')
  async getUserProfile(@Param('id') userId: string): Promise<AuthUser> {
    return this.adminProfileService.getSingleUser(userId).catch((err) => {
      throw new HttpException(err.message, err.statusCode ?? 400);
    });
  }

  @Put(':id')
  async editUserProfile(
    @Param('id') userId: string,
    @Body() updateData: UpdateUserDto,
  ): Promise<UpdatedUserResponse> {
    return this.adminProfileService
      .updateUserProfile(userId, updateData)
      .catch((err) => {
        throw new HttpException(err.message, err.statusCode ?? 400);
      });
  }

  @Put('updateStatus/:id')
  async editStatus(
    @Param('id') id: string,
    @Body() updateStatus: UpdateStatusDto,
  ): Promise<UpdatedUserResponse> {
    return this.adminProfileService
      .updateUserStatus(id, updateStatus)
      .catch((err) => {
        throw new HttpException(err.message, err.statusCode ?? 400);
      });
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<UpdatedUserResponse> {
    return this.adminProfileService.deleteUser(userId).catch((err) => {
      throw new HttpException(err.message, err.statusCode ?? 400);
    });
  }
}
