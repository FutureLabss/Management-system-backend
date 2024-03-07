import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AdminAuthGuard } from 'src/core/guard/admin.guard';
import { ProfileService } from '../services/profile.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@UseGuards(AdminAuthGuard)
@Controller('')
export default class ProfileController {
  constructor(private ProfileService: ProfileService) {}

  @Get('')
  getProfile(@Request() req) {
    return req.user;
  }
}
