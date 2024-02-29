import { AuthUser } from "src/all_modules/authentication/schema/entity/login.entity";
import { Role } from "src/all_modules/authentication/schema/enum/auth.enum";

export class UserResponse extends AuthUser{
    role: Role;
    department: string;
    status: boolean;
    profilePicture: string
}