import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { ProfileService } from '../services/profile.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('')
export default class ProfileController {
  constructor(private ProfileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Request() req) {
    return req.user;
  }
}
