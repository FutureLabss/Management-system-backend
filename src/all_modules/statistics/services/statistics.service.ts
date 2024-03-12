import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Auth } from "src/all_modules/authentication/model/auth.model";
import { Profile } from "src/all_modules/profile/model/profile.model";
import { UserStatsResponse } from "../schema/interface/statistics.interface";
import { GenderTotal } from "../schema/dto/entity/gender.entity";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(Profile.name) private profileModel: mongoose.Model<Profile>,
  ) {}

  
  async getGenderCounts(): Promise<GenderTotal> {
    const pipeline = [
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 },
        },
      },
    ]; 
    const result: { _id: string; count: number }[] =
      await this.authModel.aggregate(pipeline);
    let total = { male: 0, female: 0 };
    result.forEach(({ _id, count }) => {
      total[_id] = count;
    });

    return {
      male: total.male,
      female: total.female,
      total: total.male + total.female,
    };
  }

}