import { Controller, HttpException, Get} from "@nestjs/common";
import { StatisticsService } from "../services/statistics.service";


@Controller('')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) {}

    @Get('gender')
    async getGenderCounts(): Promise<{ male: number; female: number }> {
      return this.statisticsService.getGenderCounts().catch((err) => {
        throw new HttpException(err.message, err.statusCode ?? 400);
      });
    }
  
    
}
