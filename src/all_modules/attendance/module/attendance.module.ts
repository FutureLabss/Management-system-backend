import { Module } from "@nestjs/common";
import { AttendanceController } from "../controller/attendance.controller";
import { AttendanceService } from "../services/attendance.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Attendance, AttendanceSchema } from "../model/attendance.model";





@Module({
    imports:[MongooseModule.forFeature([{ name: Attendance.name, schema: AttendanceSchema }])],
    controllers: [AttendanceController],
    providers: [AttendanceService]
})

export class AttendanceModule {}
   
