import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender, Role } from 'src/all_modules/authentication/schema/enum/auth.enum';
import { UserTypeSelection } from '../enum/userProfile.enum';
import { ApiProperty } from '@nestjs/swagger';

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

export interface IPassword{
  fullName: string;
  email: string;
}
export interface IEmail extends IPassword{
  password: string | number;
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

  @ApiProperty({description:"kjhwhkhwk"})
  @IsString()
  @IsOptional()
  department: string;
  @IsString()
  @IsOptional()
  fullName: string;
  @IsEnum(UserTypeSelection)
  @IsOptional()
  userType: UserTypeSelection
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender
}
