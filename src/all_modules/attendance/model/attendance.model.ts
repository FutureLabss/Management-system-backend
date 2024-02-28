import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema()
export class Attendance {
leId: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);


