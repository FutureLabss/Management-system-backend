import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AuthDocument } from 'src/all_modules/authentication/model/auth.model';


export type EMailDocument = HydratedDocument<ForgotPassword>;

@Schema()
export class ForgotPassword {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string | AuthDocument
  @Prop({ type: Number, required: true })
  otp: number;
  @Prop({ type: Date, expires: 10 * 60, required: true }) // 30 minutes
  expiredIn: Date;

}

export const EmailSchema = SchemaFactory.createForClass(ForgotPassword);

