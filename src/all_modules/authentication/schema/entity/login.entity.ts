export class AuthUser {
  id: string;
  fullName: string;
  email: string;
}
export class UpdatedUserResponse{
  message:string
}
export class AuthResponse extends AuthUser {
  token: string;
}
