import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender } from 'src/all_modules/authentication/schema/enum/auth.enum';

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: Gender;
}

export interface IAdminUserUpdate {
  fullName?: string;
  phoneNumber?: string;
  gender?: Gender;
  department?: string;
  profilePicture?: string;
}

export class Pagination {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  pageSize: number = 10;
}

export class Filter extends Pagination {
  @IsString()
  @IsOptional()
  department: string;
}
