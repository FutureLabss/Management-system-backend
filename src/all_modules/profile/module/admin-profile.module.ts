import { Module } from "@nestjs/common";
import { Profile, ProfileSchema } from "../model/profile.model";
import AdminProfileController from "../controller/adminProfile.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminProfileService } from "../services/admin-profile.service";





@Module({
    imports:[MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
    controllers: [AdminProfileController],
    providers: [AdminProfileService]
})

export class AdminProfileModule {}
   
