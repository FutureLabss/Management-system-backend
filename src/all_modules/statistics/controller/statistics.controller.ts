import { Controller, HttpException, Get} from "@nestjs/common";
import { StatisticsService } from "../services/statistics.service";
import { ApiTags } from "@nestjs/swagger";
import { GenderTotal } from "../schema/dto/entity/gender.entity";


@ApiTags('statistics')
@Controller('')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) {}

    @Get('gender')
    async getGenderCounts(): Promise<GenderTotal> {
      return this.statisticsService.getGenderCounts().catch((err) => {
        throw new HttpException(err.message, err.statusCode ?? 400);
      });
    }
  
    
}
