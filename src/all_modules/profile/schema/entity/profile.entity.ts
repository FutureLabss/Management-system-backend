import { AuthUser } from "src/all_modules/authentication/schema/entity/login.entity";
import { Role } from "src/all_modules/authentication/schema/enum/auth.enum";
import { UserTypeSelection } from "../enum/userProfile.enum";

export class UserResponse extends AuthUser{
    role: Role;
    department: string;
    status: boolean;
    profilePicture: string
}

export class SingleUserResponse extends UserResponse{
    userType: UserTypeSelection;
    phoneNumber: string;
}