import { Module } from '@nestjs/common';
import { AuthModule } from './all_modules/authentication/module/auth.module';
import { AttendanceModule } from './all_modules/attendance/module/attendance.module';
import { BiometricModule } from './all_modules/biometric/module/biometric.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './all_modules/profile/module/profile.module';
import { AdminProfileModule } from './all_modules/profile/module/admin-profile.module';
import routes from './route';
import { StatisticsModule } from './all_modules/statistics/module/statistics.module';
import { AdminProfileService } from './all_modules/profile/services/admin-profile.service';
import { Connection } from 'mongoose';
import { PaginatePlugin } from './core/plugins/mongo.plugins';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODBURI, {
      connectionFactory: (connection: Connection) => {
        connection.plugin(PaginatePlugin);
        return connection;
      },
    }),
    AuthModule,
    AttendanceModule,
    BiometricModule,
    AdminProfileModule,
    ProfileModule,
    StatisticsModule,
    routes,
  ],
})
export class AppModule {}
