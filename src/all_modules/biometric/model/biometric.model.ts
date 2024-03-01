import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type BiometricDocument = HydratedDocument<Biometric>;

@Schema()
export class Biometric {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string;
  @Prop({type: String})
  userBiometric: string;
}

export const BiometricSchema = SchemaFactory.createForClass(Biometric);
