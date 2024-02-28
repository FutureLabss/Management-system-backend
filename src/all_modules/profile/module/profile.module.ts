import { Module } from '@nestjs/common';
import UserProfileController from '../controller/Profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '../model/profile.model';
import { ProfileService } from '../services/profile.service';
import ProfileController from '../controller/Profile.controller';
import { Auth, AuthSchema } from 'src/all_modules/authentication/model/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
