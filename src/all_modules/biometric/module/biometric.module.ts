import { Module } from "@nestjs/common";
import { BiometricController } from "../controller/biometric.controller";
import { BiometricService } from "../services/auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Biometric, BiometricSchema } from "../model/biometric.model";
;




@Module({
    imports:[MongooseModule.forFeature([{ name: Biometric.name, schema: BiometricSchema }])],
    controllers: [BiometricController],
    providers: [BiometricService]
})

export class BiometricModule {}
   
