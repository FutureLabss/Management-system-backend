import { Controller, Get } from "@nestjs/common";
import { AttendanceService } from "../services/attendance.service";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("attendance")
@Controller('')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {}

    @Get()
    async getAttendances(): Promise<any> {
        return this.attendanceService.getAll();
    }
    
}
