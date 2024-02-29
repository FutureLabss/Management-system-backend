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
  readonly phoneNumber: number;
  @IsNotEmpty()
  readonly department: string;
  @IsEnum(Gender)
  readonly gender: Gender;
  @IsEnum(Role)
  readonly role: Role;
}
