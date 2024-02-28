import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Gender, Role } from '../schema/enum/auth.enum';
import { hash } from 'bcrypt';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop()
  fullName: string;
  @Prop({ type: String, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  phoneNumber: number;
  @Prop({ enum: Gender })
  gender: Gender;
  @Prop({ enum: Role, default: Role.USER })
  role: Role;
  @Prop({default:false})
  isVerified:boolean
  @Prop({default:true})
  isActive:boolean
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.pre<Auth>('save', async function (next: Function) {
  this.password = await hash(this.password, 8);
  next();
});