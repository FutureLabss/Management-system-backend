import {
    IsEnum,
    IsNotEmpty,
  } from 'class-validator';
  import {
    Gender, 
  } from 'src/all_modules/authentication/schema/enum/auth.enum';
 
  
  export class UpdateUserDto {
    // @IsNotEmpty()
    readonly fullName?: string;
    // @IsNotEmpty()
    readonly phoneNumber?: string;
    // @IsNotEmpty()
    readonly department?: string;
    // @IsEnum(Gender)
    readonly gender?: Gender;
    // @IsNotEmpty()
    readonly role: string;
    // @IsNotEmpty()
    readonly profilePicture?: string;
  }
  