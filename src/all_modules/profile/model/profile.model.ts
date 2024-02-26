
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Status, UserTypeSelection } from '../schema/enum/userProfile.enum';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string
  @Prop()
  department:string
  @Prop({enum: Status, default: Status.ACTIVE})
  status:Status
  @Prop({enum:UserTypeSelection, default:UserTypeSelection.TRAINEE})
  userType: UserTypeSelection
  @Prop()
  profilePicture:string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

