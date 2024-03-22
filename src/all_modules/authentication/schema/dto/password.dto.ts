import { IsNotEmpty, IsString } from 'class-validator';

export class passwordDTO {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword?: string;
}


export class ForgotPasswordDto{
    @IsString()
    @IsNotEmpty()
    email:string;
  }