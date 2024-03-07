import { AuthDocument } from "../../model/auth.model";
import { Role } from "../enum/auth.enum";

export class AuthUser {
  id: string | AuthDocument
  fullName: string;
  email: string;
  role:Role
}
export class UpdatedUserResponse{
  message:string
}
export class AuthResponse extends AuthUser {
  token: string;
}
