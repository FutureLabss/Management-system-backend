import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/all_modules/authentication/schema/entity/login.entity';
import { Role } from 'src/all_modules/authentication/schema/enum/auth.enum';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const response = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser;
    return response && user.role == Role.ADMIN
  }
}
