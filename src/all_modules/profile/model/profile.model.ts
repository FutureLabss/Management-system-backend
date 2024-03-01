
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { UserTypeSelection } from '../schema/enum/userProfile.enum';
import { AuthDocument } from 'src/all_modules/authentication/model/auth.model';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string | AuthDocument
  @Prop({type: String})
  department:string
  @Prop({enum:UserTypeSelection, default:UserTypeSelection.TRAINEE})
  userType: UserTypeSelection
  @Prop({type:String})
  profilePicture:string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

