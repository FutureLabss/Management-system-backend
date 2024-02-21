import { Controller } from '@nestjs/common';
import { UserProfileService } from '../services/userProfile.service';

@Controller('')
export default class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}
}
