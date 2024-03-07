import { IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from 'src/all_modules/authentication/schema/enum/auth.enum';

export class UpdateUserDto {
  readonly fullName?: string;

  readonly phoneNumber?: string;

  readonly department?: string;

  readonly gender?: Gender;

  readonly role: string;

  readonly profilePicture?: string;
}
