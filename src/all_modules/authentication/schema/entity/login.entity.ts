import { AuthDocument } from "../../model/auth.model";

export class AuthUser {
  id: string | AuthDocument
  fullName: string;
  email: string;
}
export class UpdatedUserResponse{
  message:string
}
export class AuthResponse extends AuthUser {
  token: string;
}
