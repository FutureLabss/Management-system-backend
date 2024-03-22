import { AuthDocument } from '../../model/auth.model';

export interface IForgotPassword {
  userId: string ;
  otp: number;
}
