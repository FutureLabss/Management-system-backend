import { Gender } from "src/all_modules/authentication/schema/enum/auth.enum";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: number;
  gender: Gender;
}
