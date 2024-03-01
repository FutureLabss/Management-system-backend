import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Gender,
  Role,
} from 'src/all_modules/authentication/schema/enum/auth.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly fullName: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly phoneNumber: string;
  @IsNotEmpty()
  readonly department: string;
  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}
