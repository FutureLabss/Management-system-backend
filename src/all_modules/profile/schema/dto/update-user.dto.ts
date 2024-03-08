import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Gender,
  Role,
} from 'src/all_modules/authentication/schema/enum/auth.enum';
export class UserUpdateDto{
  @IsString()
  @IsOptional()
  readonly fullName?: string;
  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;
  @IsEnum(Gender)
  @IsOptional()
  readonly gender: Gender;
  @IsOptional()
  readonly profilePicture: string | Document;

}

export class UpdateUserDto extends UserUpdateDto {
  @IsString()
  @IsOptional()
  readonly department?: string;
  @IsEnum(Role)
  @IsOptional()
  readonly role: Role;
}
