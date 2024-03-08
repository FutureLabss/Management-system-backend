import { Controller, Get, UseGuards, Request, HttpException, Put, Param, Body } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/core/guard/user.guard';
import { UserUpdateDto } from '../schema/dto/update-user.dto';
import { UpdatedUserResponse } from 'src/all_modules/authentication/schema/entity/login.entity';

@ApiTags('profile')
@UseGuards(UserAuthGuard)
@Controller('')
export default class ProfileController {
  constructor(private ProfileService: ProfileService) {}

  @Get('')
  async getProfile(@Request() req) {
   const userId  = req.user.id;
    return this.ProfileService.getUserProfile(userId).catch((err) => {
      throw new HttpException(err.message, err.statusCode ?? 400);
    });
  }
  @Put('')
  async updateUserProfile(
    @Body() updateData: UserUpdateDto, @Request() req
  ): Promise<UpdatedUserResponse> {
    const userId = req.user.id;
    console.log(userId)
    return this.ProfileService.updateProfileInfo(userId, updateData)
      .catch((err) => {
        throw new HttpException(err.message, err.statusCode ?? 400);
      });
  }
}
