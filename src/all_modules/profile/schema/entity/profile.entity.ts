import { AuthUser } from "src/all_modules/authentication/schema/entity/login.entity";

export class AuthUserResponse extends AuthUser{
    department: string;
    status: boolean;
}