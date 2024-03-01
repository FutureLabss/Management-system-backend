import { Gender } from "src/all_modules/authentication/schema/enum/auth.enum";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: Gender;
}


export interface IAdminUserUpdate{
  fullName?:string
  phoneNumber?: string;
  gender?: Gender;
  department?: string;
  profilePicture?:string
}