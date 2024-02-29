import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Profile } from '../model/profile.model';
import { CreateUserDto } from '../schema/dto/create-user.dto';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { UpdateUserDto } from '../schema/dto/update-user.dto';
import { Auth } from 'src/all_modules/authentication/model/auth.model';
import { UpdateStatusDto } from '../schema/dto/update-status.dto';
import { IUser } from '../schema/interface/profile.interface';
import {
  AuthUser,
  UpdatedUserResponse,
} from 'src/all_modules/authentication/schema/entity/login.entity';

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
        const userPassword = 'auto-generate-password';
        const newUserData: IUser = {
          ...userDto,
          password: userPassword,
        };

        const newAuthModel = new this.authModel(newUserData);
        const newUser = await newAuthModel.save();
        const newProfileModel = new this.profileModel({
          userId: newUser._id,
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

  async getSingleUser(userId: string) {
    const user = await this.authModel
      .findById({ id: userId })
      .then((singleUser) => {
        if (!singleUser) {
          throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
        }
        const userResponse: AuthUser = {
          id: userId,
          fullName: singleUser.fullName,
          email: singleUser.email,
        };
        return userResponse;
      });
  }

  async updateUserProfile(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<UpdatedUserResponse> {
    let user = await this.authModel.findById({ id: userId });
    if (!user) {
      throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
    }
    return await this.authModel
      .findOneAndUpdate({ id: userId }, updateData)
      .then((updated) => {
        if (!updated) {
          throw (
            (new ServiceException('Failed to update the data'),
            HttpStatus.EXPECTATION_FAILED)
          );
        }

        const updatedUser: UpdatedUserResponse = {
          message: `The details for ${updated.fullName} has been updated successfully`,
        };
        return updatedUser;
      });
  }

  async getUserProfile(userId: string): Promise<AuthUser> {
    let user = await this.authModel.findById({ id: userId });
    if (!user) {
      throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
    }
    const userResponse: AuthUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };
    return userResponse;
  }

  async updateUserStatus(
    userId: string,
    updateStatus: UpdateStatusDto,
  ): Promise<UpdatedUserResponse> {
    let user = await this.authModel.findById({ id: userId });
    if (!user) {
      throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
    }

    return await this.authModel
      .findOneAndUpdate({ id: userId, updateStatus })
      .then((statusChanged) => {
        if (!statusChanged) {
          throw (
            (new ServiceException('Failed to update user status'),
            HttpStatus.EXPECTATION_FAILED)
          );
        }

        const updatedUser: UpdatedUserResponse = {
          message: `The status for ${user.fullName} has been successfully changed.`,
        };
        return updatedUser;
      });
  }

  async deleteUser(userId: string): Promise<AuthUser> {
    return await this.authModel
      .findOneAndDelete({ id: userId })
      .then(async (user): Promise<AuthUser> => {
        if (!user) {
          throw (
            (new ServiceException('User not found'), HttpStatus.BAD_REQUEST)
          );
        }

        return user as AuthUser;
      });
  }
}
