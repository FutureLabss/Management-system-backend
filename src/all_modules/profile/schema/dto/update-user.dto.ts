import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    MaxLength,
    MinLength,
  } from 'class-validator';
  import {
    Gender, Role,
  } from 'src/all_modules/authentication/schema/enum/auth.enum';
 
  
  export class UpdateUserDto {
    @IsNotEmpty()
    readonly fullName?: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email?: string;
    @MinLength(6)
    @MaxLength(15)
    readonly password?: string;
    @IsNotEmpty()
    readonly phoneNumber?: number;
    @IsNotEmpty()
    readonly department?: string;
    @IsEnum(Gender)
    readonly gender?: Gender;
    @IsEnum(Role)
    readonly role?:Role
  }
  