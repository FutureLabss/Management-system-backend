import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { UserProfileService } from '../services/user-profile.service';

@Controller('')
export default class ProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Request() req) {
    return req.user;
  }
}
