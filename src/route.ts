import { RouterModule } from '@nestjs/core';
import attendanceRoute from './all_modules/attendance/route/attendance.route';
import authRoute from './all_modules/authentication/route/auth.route';
import biometricRoute from './all_modules/biometric/route/biometric.route';
import { profileRoute } from './all_modules/profile/route/profile.route';


const routes = RouterModule.register([
  attendanceRoute,
  authRoute,
  biometricRoute,
  profileRoute,
]);

export default routes;
