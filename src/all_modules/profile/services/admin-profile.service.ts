import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Profile } from '../model/profile.model';
import { Auth } from 'src/all_modules/authentication/model/auth.model';
import { CreateUserDto } from '../schema/dto/create-user.dto';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { AuthUser } from 'src/all_modules/authentication/schema/entity/login.entity';
import { UpdateUserDto } from '../schema/dto/update-user.dto';
@Injectable()
export class AdminProfileService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(Profile.name) private profileModel: mongoose.Model<Profile>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthUser> {
    const { department, ...userDto } = createUserDto;
    return await this.authModel
      .findOne({ email: createUserDto.email })
      .then(async (user) => {
        if (user) {
          throw new ServiceException(
            'Email already in use, try another one',
            HttpStatus.BAD_REQUEST,
          );
        }
        user.password = 'auto-generate-password';

        const newAuthModel = new this.authModel(userDto);
        const newUser = await newAuthModel.save();
        const newProfileModel = new this.profileModel({
          userId: newUser.id,
          department,
        });
        await newProfileModel.save();
        const response: AuthUser = {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
        };
        return response;
      });
  }

  async getAllUsers(): Promise<AuthUser[]> {
    return await this.authModel.find().then((allUsers) =>
      allUsers.map(
        (user) =>
          <AuthUser>{
            fullName: user.fullName,
            email: user.email,
          },
      ),
    );
  }

  async updateUserProfile(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<AuthUser> {
    let user = await this.authModel.findById({ id: userId });
    if (!user) {
      throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
    }
    return await this.authModel
      .findOneAndUpdate({ id: userId }, updateData)
      .then((update) => {
        if (!update) {
          throw new ServiceException('Failed to update the data'), HttpStatus.EXPECTATION_FAILED;
        }

        const updatedUser: AuthUser = {
          ...user.toJSON(),
          ...updateData,
        };
        return updatedUser;
      });
  }

  async deleteUser(userId: string): Promise<AuthUser> {
    return await this.authModel.findOneAndDelete({ id: userId })
    .then(async (user): Promise<AuthUser> => {
if(!user){
throw new ServiceException( "User not found"), HttpStatus.BAD_REQUEST
}

return  user as AuthUser;

    });
    
  }
}
