import { AdminProfileModule } from "../module/admin-profile.module";
import { ProfileModule } from "../module/profile.module";

export const profileRoute = {
    path: 'profile',
  module: ProfileModule,
  children:[{
    path: 'admin',
  module: AdminProfileModule,
  }]
}

