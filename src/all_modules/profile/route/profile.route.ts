import { StatisticsModule } from "src/all_modules/statistics/module/statistics.module";
import { AdminProfileModule } from "../module/admin-profile.module";
import { ProfileModule } from "../module/profile.module";

export const profileRoute = {
    path: 'profile',
  module: ProfileModule,
  children:[{
    path: 'admin',
  module: AdminProfileModule,
  },
  {
    path: 'stats',
  module: StatisticsModule,
  }
]
}

