import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Attendance } from '../../users/model/attendance.model';

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: mongoose.Model<Attendance>,) {}

  getAll(){
    return "this is all attendance"
  }

  async validateUser(email: string, password: string) {
    const user = await this.attendanceModel.findOne()
  }
 

}
