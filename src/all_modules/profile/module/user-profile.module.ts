import { Module } from "@nestjs/common";
import UserProfileController from "../controller/userProfile.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile, ProfileSchema } from "../model/profile.model";
import { UserProfileService } from "../services/user-profile.service";





@Module({
    imports:[MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
    controllers: [UserProfileController],
    providers: [UserProfileService]
})

export class UserProfileModule {}
   
