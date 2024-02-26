import { Controller, Get } from "@nestjs/common";
import { AttendanceService } from "../services/attendance.service";


@Controller('')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {}

    @Get()
    async getAttendances(): Promise<any> {
        return this.attendanceService.getAll();
    }
    
}
