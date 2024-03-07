import { Module } from '@nestjs/common';
import { Profile, ProfileSchema } from '../model/profile.model';
import AdminProfileController from '../controller/adminProfile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminProfileService } from '../services/admin-profile.service';
import {
  Auth,
  AuthSchema,
} from 'src/all_modules/authentication/model/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
  ],
  controllers: [AdminProfileController],
  providers: [AdminProfileService],
  exports:[AdminProfileService]
})
export class AdminProfileModule {}
