import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth, AuthSchema } from "src/all_modules/authentication/model/auth.model";
import { StatisticsService } from "../services/statistics.service";
import { StatisticsController } from "../controller/statistics.controller";
import { Profile, ProfileSchema } from "src/all_modules/profile/model/profile.model";
;




@Module({
    imports:[    MongooseModule.forFeature([
        { name: Profile.name, schema: ProfileSchema },
        { name: Auth.name, schema: AuthSchema },
      ]),],
    controllers: [StatisticsController],
    providers: [StatisticsService]
})

export class StatisticsModule {}
   
