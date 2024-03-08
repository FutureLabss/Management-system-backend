import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Profile } from '../model/profile.model';
import { Auth } from 'src/all_modules/authentication/model/auth.model';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { SingleUserResponse } from '../schema/entity/profile.entity';
import { UserUpdateDto } from '../schema/dto/update-user.dto';
import { UpdatedUserResponse } from 'src/all_modules/authentication/schema/entity/login.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(Profile.name) private profileModel: mongoose.Model<Profile>,
  ) {}

  async getUserProfile(id: string): Promise<SingleUserResponse> {
    return await this.authModel.findById(id).then(async (user) => {
      if (!user) {
        throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
      }
      const profileId = user.id;
      return await this.profileModel
        .findOne({ userId: profileId })
        .populate({ path: 'userId' })
        .then((data) => {
          return <SingleUserResponse>{
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            department: data.department,
            userType: data.userType,
          };
        });
    });
  }

  async updateProfileInfo(
    id: string,
    updateData: UserUpdateDto,
  ): Promise<UpdatedUserResponse> {
    const { profilePicture, ...userInfo } = updateData;
    return await this.authModel.findById(id).then(async (existingUser) => {
      if (!existingUser) {
        throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
      }
      this.authModel.findByIdAndUpdate(id, userInfo);
      return await this.profileModel
        .findOne({ userId: id })
        .then(async (updateUser) => {
          await this.profileModel
            .findByIdAndUpdate(updateUser._id, {profilePicture})
            .then((result) => {
              console.log("successful", {result})
            });
          return { message: 'Successfully updated!' };
        });
    });
  }
}
