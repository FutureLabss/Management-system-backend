import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema()
export class Attendance {
@Prop({ type:String, required: true })
userId: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);


